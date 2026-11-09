#!/usr/bin/env python3
"""Phase 2: migrate public/收集材料 -> research/materials/raw, emit manifest CSV."""
from __future__ import annotations

import csv
import hashlib
import json
import re
import shutil
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "收集材料"
DST_ROOT = ROOT / "research" / "materials" / "raw"

EXT_MAP = {
    ".xlsx": DST_ROOT / "excel",
    ".docx": DST_ROOT / "docx",
    ".txt": DST_ROOT / "docx",
    ".png": DST_ROOT / "images",
    ".jpg": DST_ROOT / "images",
    ".jpeg": DST_ROOT / "images",
    ".webp": DST_ROOT / "images",
    ".mp4": DST_ROOT / "videos",
    ".svg": DST_ROOT / "svg",
}

PURPOSE = {
    ".xlsx": "纹样档案表（15条）",
    ".docx": "工艺/非遗/工具原始文档",
    ".txt": "工艺简介文本",
    ".png": "纹样或蜡染参考图",
    ".mp4": "工艺过程视频",
    ".svg": "获授权SVG纹样素材",
}

PUBLIC_AUTH = {
    ".xlsx": "禁止公开",
    ".docx": "禁止公开",
    ".txt": "禁止公开",
    ".mp4": "未审—禁止公开",
    "network_png": "暂不公开，等待授权和来源核验",
    "batik_png": "待人工审核后择优公开",
    "licensed_svg": "文件夹标注获授权—待核对后公开",
}


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def classify_png(rel: str) -> str:
    if "其他网络搜集纹样" in rel:
        return "network_png"
    if "/蜡染/" in rel.replace("\\", "/"):
        return "batik_png"
    return "batik_png"


def dest_for(src: Path, rel: str) -> Path:
    ext = src.suffix.lower()
    base = EXT_MAP.get(ext, DST_ROOT / "misc")
    safe_name = rel.replace("/", "__").replace("\\", "__")
    return base / safe_name


def migrate(copy_only: bool = True) -> dict:
    for d in EXT_MAP.values():
        d.mkdir(parents=True, exist_ok=True)
    (ROOT / "research" / "materials" / "media-review").mkdir(parents=True, exist_ok=True)
    (ROOT / "research" / "materials" / "exports").mkdir(parents=True, exist_ok=True)

    rows = []
    skipped = []
    if not SRC.exists():
        raise SystemExit(f"Source missing: {SRC}")

    for src in sorted(SRC.rglob("*")):
        if not src.is_file():
            continue
        name = src.name
        if name.startswith("~$"):
            skipped.append(str(src.relative_to(ROOT)))
            continue
        rel = str(src.relative_to(SRC)).replace("\\", "/")
        ext = src.suffix.lower()
        dst = dest_for(src, rel)
        dst.parent.mkdir(parents=True, exist_ok=True)
        if copy_only:
            shutil.copy2(src, dst)
        digest = sha256_file(src)
        dst_digest = sha256_file(dst)
        auth = PUBLIC_AUTH.get(ext, "禁止公开")
        if ext == ".png":
            auth = PUBLIC_AUTH[classify_png(rel)]
        if ext == ".svg" and "获授权" in rel:
            auth = PUBLIC_AUTH["licensed_svg"]
        rows.append(
            {
                "original_relative_path": f"public/收集材料/{rel}",
                "archive_path": str(dst.relative_to(ROOT)).replace("\\", "/"),
                "filename": name,
                "format": ext.lstrip(".") or "unknown",
                "size_bytes": src.stat().st_size,
                "sha256_source": digest,
                "sha256_archive": dst_digest,
                "sha256_match": digest == dst_digest,
                "purpose": PURPOSE.get(ext, "原始资料"),
                "public_auth_status": auth,
            }
        )

    manifest_csv = ROOT / "research" / "materials" / "exports" / "materials_manifest.csv"
    with manifest_csv.open("w", encoding="utf-8-sig", newline="") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()) if rows else [])
        w.writeheader()
        w.writerows(rows)

    summary = {
        "migrated_at": datetime.now(timezone.utc).isoformat(),
        "source_dir": str(SRC),
        "file_count": len(rows),
        "skipped_temp": len(skipped),
        "all_sha256_match": all(r["sha256_match"] for r in rows),
        "by_format": {},
    }
    for r in rows:
        summary["by_format"][r["format"]] = summary["by_format"].get(r["format"], 0) + 1

    (ROOT / "research" / "materials" / "exports" / "migration_summary.json").write_text(
        json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    return {"rows": rows, "skipped": skipped, "summary": summary}


def verify_archive_against_manifest() -> bool:
    """Re-hash archive copies; all must match materials_manifest.csv."""
    manifest = ROOT / "research" / "materials" / "exports" / "materials_manifest.csv"
    if not manifest.exists():
        return False
    with manifest.open(encoding="utf-8-sig", newline="") as f:
        rows = list(csv.DictReader(f))
    for r in rows:
        ap = ROOT / r["archive_path"]
        if not ap.is_file():
            return False
        if sha256_file(ap) != r["sha256_archive"]:
            return False
    return len(rows) > 0 and all(r.get("sha256_match") == "True" for r in rows)


def remove_public_copy_after_verify() -> dict:
    if not SRC.exists():
        return {"removed": False, "reason": "source already absent"}
    if not verify_archive_against_manifest():
        raise SystemExit("Archive verification failed; not removing public/收集材料")
    file_count = sum(1 for _ in SRC.rglob("*") if _.is_file() and not _.name.startswith("~$"))
    locked: list[str] = []

    def on_rm_error(func, path, _exc_info):
        try:
            import stat

            os.chmod(path, stat.S_IWRITE)
            func(path)
        except OSError:
            locked.append(str(path))

    shutil.rmtree(SRC, onerror=on_rm_error)
    if locked:
        return {
            "removed": not SRC.exists(),
            "partial": True,
            "locked_files": locked,
            "former_file_count": file_count,
        }
    return {"removed": True, "former_file_count": file_count}


if __name__ == "__main__":
    import sys

    if len(sys.argv) > 1 and sys.argv[1] == "remove-public":
        print(json.dumps(remove_public_copy_after_verify(), ensure_ascii=False, indent=2))
    else:
        result = migrate(copy_only=True)
        print(json.dumps(result["summary"], ensure_ascii=False, indent=2))
        print("skipped", len(result["skipped"]))
