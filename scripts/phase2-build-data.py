#!/usr/bin/env python3
"""Generate patterns.archive.json, craft.miao-12.json, pattern-image-review.csv"""
from __future__ import annotations

import csv
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def parse_urls(text: str) -> list[dict]:
    if not text or (isinstance(text, float) and str(text) == "nan"):
        return []
    text = str(text)
    sources = []
    for m in re.finditer(r"\[([^\]]+)\]\((https?://[^\)]+)\)", text):
        sources.append({"title": m.group(1).strip(), "url": m.group(2).strip()})
    for m in re.finditer(r"(https?://[^\s\]\)]+)", text):
        url = m.group(1).rstrip(")].,;")
        url = url.split("](", 1)[0]
        if not any(s["url"] == url for s in sources):
            title = url.split("/")[2] if "/" in url else url
            sources.append({"title": title, "url": url})
    return sources


def has_dou(s: str) -> bool:
    return bool(s) and ("豆" in str(s))


PARAM_SOURCE_NOTE = (
    "摘自《黔东南苗侗蜡染分步操作说明书》「表2　关键参数速查表」；"
    "数值为传统生产经验的归纳，供操作参照，不作为统一强制标准。"
)

# 说明书表2原文 — 仅录入明确出现的参数量级
REF_PARAMS_BY_STEP_ORDER: dict[int, list[dict]] = {
    1: [
        {
            "name": "浸泡天数",
            "range": "五至七天（高温）；低温延长至十天",
            "unit": "天",
            "basis": "茎叶腐烂、液体转蓝绿",
            "sourceNote": PARAM_SOURCE_NOTE,
        }
    ],
    2: [
        {
            "name": "发酵天数",
            "range": "三至七日",
            "unit": "天",
            "basis": "液面黄绿、泡沫细密持久",
            "sourceNote": PARAM_SOURCE_NOTE,
        },
        {
            "name": "缸温",
            "range": "十五摄氏度以上",
            "unit": "摄氏度",
            "basis": "低于此温度上染明显变慢",
            "sourceNote": PARAM_SOURCE_NOTE,
        },
    ],
    3: [
        {
            "name": "灰水浸泡",
            "range": "一至二日",
            "unit": "日",
            "basis": "布面不滑手、滴水扩散均匀",
            "sourceNote": PARAM_SOURCE_NOTE,
        }
    ],
    4: [
        {
            "name": "蜡液温度",
            "range": "蜂蜡熔点约六十至六十五摄氏度",
            "unit": "摄氏度",
            "basis": "蜡液清亮、不冒烟、落布即凝",
            "sourceNote": PARAM_SOURCE_NOTE,
        }
    ],
    5: [
        {
            "name": "走刀速度",
            "range": "视线宽需要即时调整",
            "unit": None,
            "basis": "线宽均匀、边缘清晰",
            "sourceNote": PARAM_SOURCE_NOTE,
        }
    ],
    7: [
        {
            "name": "单次浸泡",
            "range": "约二十至三十分钟",
            "unit": "分钟",
            "basis": "布面均匀吃色",
            "sourceNote": PARAM_SOURCE_NOTE,
        },
        {
            "name": "浸染次数",
            "range": "浅色五至六次；深蓝十余次以上",
            "unit": "次",
            "basis": "颜色比目标略浅即停",
            "sourceNote": PARAM_SOURCE_NOTE,
        },
        {
            "name": "氧化时间",
            "range": "至布面由绿转蓝、颜色稳定",
            "unit": None,
            "basis": "色相不再明显变化",
            "sourceNote": PARAM_SOURCE_NOTE,
        },
    ],
    9: [
        {
            "name": "煮沸时间",
            "range": "十至二十分钟",
            "unit": "分钟",
            "basis": "蜡层完全熔出、白花清晰",
            "sourceNote": PARAM_SOURCE_NOTE,
        }
    ],
    10: [
        {
            "name": "漂洗次数",
            "range": "三至五次",
            "unit": "次",
            "basis": "水清、布面不发涩",
            "sourceNote": PARAM_SOURCE_NOTE,
        }
    ],
}


def derive_archive_statuses(
    sources: list,
    regional,
    meaning,
    origin,
    source_raw,
    img_src_note,
    row_num: int,
) -> tuple[str, str, str]:
    """返回 (sourceStatus, imageStatus, legacy verificationStatus)。"""
    dou_any = (
        has_dou(regional)
        or has_dou(meaning)
        or has_dou(origin)
        or has_dou(source_raw or "")
    )
    if not sources:
        source_status = "source_pending"
    elif dou_any or row_num == 2:
        source_status = "needs_review"
    elif row_num == 14 and img_src_note and ("百度" in img_src_note):
        source_status = "source_pending"
    else:
        # 有条目来源链接，但正文仍待人工终审，不得自动 verified
        source_status = "needs_review"

    image_status = "image_pending"
    if img_src_note and ("百度" in img_src_note or "image.baidu" in img_src_note):
        image_status = "restricted"

    if source_status == "source_pending":
        legacy = "source_pending"
    elif image_status == "restricted":
        legacy = "source_pending" if row_num == 14 else "image_pending"
    elif image_status == "image_pending":
        legacy = "image_pending"
    elif source_status == "needs_review":
        legacy = "needs_review"
    else:
        legacy = "needs_review"

    return source_status, image_status, legacy


def norm(s) -> str | None:
    if s is None:
        return None
    t = str(s).strip()
    if not t or t.lower() == "nan":
        return None
    return t


def build_patterns():
    import pandas as pd

    xlsx = list((ROOT / "research/materials/raw/excel").glob("*.xlsx"))[0]
    df = pd.read_excel(xlsx)
    slug_map = {
        1: "wo-tuo-danzhai-baili",
        2: "butterfly-mama-mei-bang",
        3: "fish-pattern-qiandongnan",
        4: "golden-pheasant-danzhai",
        5: "eight-petal-flower",
        6: "cattle-farming-danzhai",
        7: "bronze-drum-sun-ray",
        8: "water-wave-pattern",
        9: "bird-pattern-baili-miao",
        10: "gejia-vortex-huangping",
        11: "miao-dragon-pattern",
        12: "lotus-rice-pattern-paimo",
        13: "swallow-small-bird-baili",
        14: "phoenix-pattern-qiandongnan",
        15: "spiral-sun-ray-danzhai",
    }
    out = []
    for _, row in df.iterrows():
        n = int(row["序号"])
        name = norm(row["纹样名称"]) or f"纹样-{n}"
        name = re.sub(r"[\r\n]+", "", name)
        ethnicity_region = norm(row.get("所属民族&地区支系")) or ""
        ethnicity_region = re.sub(r"[\r\n]+", "", ethnicity_region) if ethnicity_region else ""
        ethnicity = []
        if "苗族" in ethnicity_region:
            ethnicity.append("苗族")
        if "侗族" in ethnicity_region:
            ethnicity.append("侗族")
        if "亻革家" in ethnicity_region:
            ethnicity.append("亻革家")
        regional = norm(row.get("不同地区/支系差异"))
        meaning = norm(row.get("文化寓意"))
        origin = norm(row.get("纹样由来"))
        img_src_note = norm(row.get("备注图片来源"))
        source_raw = norm(row.get("检索来源（出处链接）"))
        sources = parse_urls(source_raw or "")

        notes_parts = []
        if has_dou(regional) or has_dou(meaning) or has_dou(origin) or has_dou(source_raw or ""):
            notes_parts.append("原表含「豆」标记：相关文字待进一步核实。")
        if n == 14 and img_src_note and "百度" in img_src_note:
            notes_parts.append("备注图片来源含网络平台检索链接，不得作为馆藏主图依据。")
        source_status, image_status, legacy_status = derive_archive_statuses(
            sources, regional, meaning, origin, source_raw, img_src_note, n
        )
        if n == 2:
            notes_parts.append(
                "文化寓意字段同时出现布依族《射太阳》与苗族《妹榜妹留》体系材料；"
                "叙事与民族归属须分源展示，禁止混写为同一起源。"
            )
        if n in (1, 10, 15):
            notes_parts.append("与窝妥纹（丹寨）、亻革家旋涡纹（黄平）、丹寨螺旋+太阳芒组合纹样为三条独立档案，禁止合并。")
        if n == 7 and "侗族" in (ethnicity_region or ""):
            notes_parts.append("铜鼓太阳芒纹涉及苗族与侗族共有表述，展示须保留民族区分。")
        if n == 8:
            notes_parts.append("水波纹字段涉及苗族及苗侗迁徙表述，须分民族语境核验。")

        tags = []
        for kw in ["涡", "蝶", "鱼", "锦鸡", "八角", "农耕", "铜鼓", "水", "鸟", "龙", "莲", "燕", "凤", "螺旋", "太阳"]:
            if kw in name:
                tags.append(kw)

        entry = {
            "id": slug_map[n],
            "name": name,
            "ethnicity": ethnicity,
            "region": ethnicity_region,
            "subgroup": ethnicity_region,
            "regionalDifferences": regional,
            "culturalMeaning": meaning,
            "originStory": origin,
            "image": None,
            "imageSource": img_src_note,
            "sources": sources,
            "sourceStatus": source_status,
            "imageStatus": image_status,
            "verificationStatus": legacy_status,
            "notes": " ".join(notes_parts) if notes_parts else None,
            "tags": tags,
            "needsReviewMarkers": {
                "regionalDifferences": has_dou(regional),
                "culturalMeaning": has_dou(meaning),
                "originStory": has_dou(origin),
            },
        }
        out.append(entry)

    path = ROOT / "src/data/patterns.archive.json"
    path.write_text(json.dumps(out, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return out


def build_craft():
    manual = (ROOT / "research" / "_audit_黔东南苗侗蜡染分步操作说明书.txt").read_text(
        encoding="utf-8"
    )
    flow = (ROOT / "research" / "_audit_黔东南苗侗蜡染制作工艺流程.txt").read_text(
        encoding="utf-8"
    )

    steps_meta = [
        ("制靛", "miao-craft-01-zhi-dian", False),
        ("发缸", "miao-craft-02-fa-gang", False),
        ("坯布处理", "miao-craft-03-pi-bu", False),
        ("熔蜡", "miao-craft-04-rong-la", False),
        ("画蜡", "miao-craft-05-hua-la", False),
        ("冰纹处理", "miao-craft-06-bing-wen", False),
        ("浸染与氧化", "miao-craft-07-jinran", False),
        ("初漂洗", "miao-craft-08-chu-piao", False),
        ("煮蜡脱蜡", "miao-craft-09-zhu-la", False),
        ("净漂与晾晒", "miao-craft-10-jingpiao", False),
        ("复色点绘", "miao-craft-11-fuse", True),
        ("后整理与缝制", "miao-craft-12-hou-zhengli", False),
    ]

    cn_nums = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"]

    def extract_section(num: int) -> dict:
        header = f"（{cn_nums[num - 1]}）工序{cn_nums[num - 1]}"
        idx = manual.find(header)
        if idx < 0:
            return {}
        rest = manual[idx:]
        end_idx = len(rest)
        if num < 12:
            next_header = f"（{cn_nums[num]}）工序{cn_nums[num]}"
            ni = rest.find(next_header, len(header))
            if ni > 0:
                end_idx = ni
        else:
            ni = rest.find("四、关键参数")
            if ni > 0:
                end_idx = ni
        block = rest[:end_idx]
        if "作业条件：" in block:
            block = block[block.find("作业条件：") :]
        wc = re.search(r"作业条件：(.+)", block)
        tm = re.search(r"工具与材料：(.+)", block)
        qc = re.search(r"质量检查：(.+)", block)
        ab = re.search(r"异常处置：(.+)", block, re.S)
        ops: list[str] = []
        tools_text = tm.group(1).strip().split("\n")[0] if tm else None
        if "工具与材料：" in block and "质量检查：" in block:
            mid = block.split("工具与材料：", 1)[1].split("质量检查：", 1)[0]
            lines = [ln.strip() for ln in mid.splitlines() if ln.strip()]
            if lines:
                if tools_text and lines[0] == tools_text:
                    ops = lines[1:]
                else:
                    ops = lines[1:] if len(lines) > 1 else lines
            if not tools_text and lines:
                tools_text = lines[0]
        return {
            "workingConditions": wc.group(1).strip().split("\n")[0] if wc else None,
            "toolsAndMaterials": tools_text,
            "operationSteps": ops,
            "qualityCheck": qc.group(1).strip().split("\n")[0] if qc else None,
            "abnormalHandling": ab.group(1).strip().split("\n")[0] if ab else None,
            "rawSection": block.strip(),
        }

    steps = []
    for i, (name, sid, optional) in enumerate(steps_meta, start=1):
        sec = extract_section(i)
        steps.append(
            {
                "id": sid,
                "order": i,
                "name": name,
                "optional": optional,
                "optionalNote": "丹寨特色，可选" if optional else None,
                "applicableScope": "苗族蜡染技艺（黔东南）；侗族蓝靛染在浸染、捶布等环节另有讲究，不直接套用本说明书的画蜡工序。",
                "workingConditions": sec.get("workingConditions"),
                "toolsAndMaterials": sec.get("toolsAndMaterials"),
                "operationSteps": sec.get("operationSteps") or [],
                "qualityCheck": sec.get("qualityCheck"),
                "abnormalHandling": sec.get("abnormalHandling"),
                "referenceParameters": REF_PARAMS_BY_STEP_ORDER.get(i, []),
                "images": [],
                "videos": [],
                "sources": [
                    {
                        "title": "黔东南苗侗蜡染分步操作说明书",
                        "publisher": "工艺流程资料组",
                        "localPath": "research/materials/raw/docx/",
                    },
                    {
                        "title": "黔东南苗侗蜡染制作工艺流程",
                        "localPath": "research/materials/raw/docx/",
                    },
                ],
                "rawSection": sec.get("rawSection"),
            }
        )

    doc = {
        "meta": {
            "title": "苗族蜡染十二道工序（草案）",
            "ethnicScope": "苗族蜡染",
            "regionScope": "黔东南（丹寨、凯里、榕江等）",
            "dongNationalityNote": "侗族蓝靛染资料待独立整理，无充分材料处不得标注为与本流程通用。",
            "ichReference": "苗族蜡染技艺（国家级非遗，编号Ⅷ-25）",
            "referenceParametersDisclaimer": PARAM_SOURCE_NOTE,
            "supplementaryContent": [
                {
                    "id": "draft-sketch-auxiliary",
                    "name": "起稿",
                    "type": "辅助示意",
                    "note": "网站现有「起稿」与起稿.mp4 为画蜡前辅助示意，非说明书第十三道正式工序。",
                    "publicAssets": {
                        "video": "/videos/起稿.mp4",
                        "image": "/images/craft/craft-draft.png",
                    },
                }
            ],
        },
        "steps": steps,
        "processSummaryFromFlowDoc": flow.splitlines()[159:160] if len(flow) > 159 else [],
    }

    path = ROOT / "src/data/craft.miao-12.json"
    path.write_text(json.dumps(doc, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return doc


def build_image_review():
    raw_img = ROOT / "research/materials/raw/images"
    rows = []
    for p in sorted(raw_img.rglob("*.png")):
        rel = p.name
        is_network = "其他网络搜集纹样" in p.name or "__其他网络搜集纹样__" in str(p)
        if "__其他网络搜集纹样__" in str(p).replace("\\", "/"):
            is_network = True
        is_network = "其他网络搜集纹样" in str(p).replace("\\", "/")
        is_batik = "蜡染和纹样__蜡染__" in str(p).replace("\\", "/") or (
            not is_network and "__蜡染__" in str(p)
        )
        rows.append(
            {
                "纹样名称": "",
                "候选图片路径": str(p.relative_to(ROOT)).replace("\\", "/"),
                "图片来源": "团队收集素材/蜡染实拍整理" if is_batik and not is_network else "其他网络搜集",
                "对应民族": "",
                "对应支系": "",
                "是否与档案匹配": "否",
                "是否允许公开": "否—暂不公开，等待授权和来源核验"
                if is_network
                else "待定—待人工审核",
                "核验状态": "pending",
                "人工审核意见": "禁止仅凭文件名认定纹样身份；须核对实物与15条档案条目。"
                if is_batik and not is_network
                else "全部标记：暂不公开，等待授权和来源核验",
            }
        )
    # refine batik folder paths
    for r in rows:
        path = r["候选图片路径"]
        if "/raw/images/蜡染和纹样__蜡染__" in path or "__蜡染__" in path and "其他网络" not in path:
            r["图片来源"] = "蜡染和纹样/蜡染（团队整理图）"
            r["是否允许公开"] = "待定—待人工审核后择优公开"

    out = ROOT / "research/materials/media-review/pattern-image-review.csv"
    with out.open("w", encoding="utf-8-sig", newline="") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)
    return len(rows)


def build_svg_review():
    raw_svg = ROOT / "research" / "materials" / "raw" / "svg"
    rows = []
    for p in sorted(raw_svg.glob("*.svg")):
        original_dir = "public/收集材料/蜡染和纹样/纹样/网站收集获授权的SVG纹样素材"
        rows.append(
            {
                "文件名": p.name.split("__")[-1] if "__" in p.name else p.name,
                "归档路径": str(p.relative_to(ROOT)).replace("\\", "/"),
                "来源目录": original_dir,
                "授权说明": "归档文件夹名称含「获授权」；未见随附独立授权文书",
                "授权范围": "",
                "是否允许修改": "",
                "是否允许商业使用": "",
                "是否需要署名": "",
                "审核状态": "pending",
                "人工审核意见": "禁止自行推断授权范围；待核对原始网站授权条款后方可发布 public",
            }
        )
    out = ROOT / "research" / "materials" / "media-review" / "svg-review.csv"
    with out.open("w", encoding="utf-8-sig", newline="") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()) if rows else [])
        w.writeheader()
        w.writerows(rows)
    return len(rows)


if __name__ == "__main__":
    p = build_patterns()
    c = build_craft()
    n = build_image_review()
    s = build_svg_review()
    param_count = sum(len(st.get("referenceParameters") or []) for st in c["steps"])
    print(
        "patterns",
        len(p),
        "craft_steps",
        len(c["steps"]),
        "ref_params",
        param_count,
        "png_review",
        n,
        "svg_review",
        s,
    )
