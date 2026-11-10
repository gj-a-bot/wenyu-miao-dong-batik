#!/usr/bin/env python3
"""Copy team batik PNGs into public/images/batik-reference for site display."""
from __future__ import annotations

import json
import re
import shutil
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[1]
SOURCES = [
    ROOT / "public" / "收集材料" / "蜡染和纹样" / "蜡染",
    ROOT / "research" / "materials" / "raw" / "images",
]
DST = ROOT / "public" / "images" / "batik-reference"
OUT = ROOT / "src" / "data" / "batik-reference.json"


def slugify(name: str) -> str:
    s = name.strip().replace(" ", "-")
    return re.sub(r"[^\w\u4e00-\u9fff\-]", "", s)


def main() -> None:
    DST.mkdir(parents=True, exist_ok=True)
    seen: dict[str, Path] = {}
    for src_dir in SOURCES:
        if not src_dir.exists():
            continue
        for p in src_dir.glob("*.png"):
            if "其他网络搜集纹样" in str(p):
                continue
            if "__其他网络搜集纹样__" in p.name:
                continue
            if src_dir.name == "images" and "__蜡染__" not in p.name:
                continue
            if src_dir.name == "images":
                # raw archive name: 蜡染和纹样__蜡染__xxx.png
                if "__蜡染__" in p.name:
                    title = p.name.split("__蜡染__", 1)[-1].removesuffix(".png")
                else:
                    continue
            else:
                title = p.stem.strip()
            safe = title + ".png"
            target = DST / safe
            shutil.copy2(p, target)
            seen[title] = target

    items = []
    for title in sorted(seen.keys()):
        fname = seen[title].name
        items.append(
            {
                "id": f"ref-{slugify(title)}",
                "title": title,
                "image": "/images/batik-reference/" + quote(fname),
                "sourceNote": "团队整理蜡染实物扫描/整理图；待与15条文化档案逐项核对，不作为档案主图依据。",
                "reviewStatus": "matched_pending",
            }
        )

    OUT.write_text(json.dumps(items, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"batik-reference: {len(items)} -> {DST}")


if __name__ == "__main__":
    main()
