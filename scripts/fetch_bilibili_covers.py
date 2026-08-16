#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
方案2（本地化版）：在"构建时"根据作品的 B站 trailerBvid 拉取官方封面图，
下载到本地 assets/covers/，并把 js/main.js 的 thumb 字段写成【本地相对路径】，
从而避免使用 B站图床远程外链、加快页面加载。

- 对每个含 trailerBvid 的作品，调用 B站 API 获取官方封面 pic 的远程地址。
- 将封面下载到 assets/covers/{bvid}.jpg（已存在则跳过下载，仅更新引用）。
- 把 thumb 写成本地相对路径 'assets/covers/{bvid}.jpg'。
- 若作品已有 thumb 且为本地 assets 路径、且文件名不是 covers/ 下由本脚本管理的 ->
  视为手工指定封面，跳过不覆盖（例如 IPHI 的 assets/iphi/poster.jpg）。
- 若作品已有本脚本管理的本地封面路径（assets/covers/...）-> 幂等，不重复改动。

用法（在项目根目录）：
    python scripts/fetch_bilibili_covers.py

依赖：Python 3，仅使用标准库（urllib / re / json / os）。
注意：B站 API 需带 Referer 与 UA，否则可能被拦截。
"""

import json
import re
import urllib.request
import urllib.parse
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAIN_JS = os.path.join(ROOT, "js", "main.js")
COVERS_DIR = os.path.join(ROOT, "assets", "covers")

API_URL = "https://api.bilibili.com/x/web-interface/view?bvid={bvid}"
HEADERS = {
    "Referer": "https://www.bilibili.com",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
}

# 本地资源路径：以此开头则不覆盖（手工指定封面）
LOCAL_PREFIXES = ("assets/", "./assets/", "/assets/")
# 本脚本管理的封面目录
COVERS_PREFIX = "assets/covers/"
# B站封面域名特征
BILI_PATTERN = re.compile(r"https?://[a-z0-9]+\.hdslb\.com/", re.I)


def fetch_pic(bvid: str):
    """返回 B站官方封面的远程 URL。"""
    url = API_URL.format(bvid=urllib.parse.quote(bvid))
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=15) as resp:
        data = json.load(resp)
    if data.get("code") != 0:
        raise RuntimeError(f"B站 API 返回错误 code={data.get('code')} msg={data.get('message')}")
    pic = data.get("data", {}).get("pic")
    if not pic:
        raise RuntimeError("未找到 pic 字段")
    return pic.replace("http://", "https://", 1)


def download_cover(bvid: str, pic_url: str) -> str:
    """下载封面到本地 assets/covers/{bvid}.jpg，返回本地相对路径。"""
    os.makedirs(COVERS_DIR, exist_ok=True)
    filename = f"{bvid}.jpg"
    local_rel = f"{COVERS_PREFIX}{filename}"
    local_abs = os.path.join(COVERS_DIR, filename)
    if os.path.exists(local_abs):
        print(f"        · 本地已存在，跳过下载：{local_rel}")
        return local_rel
    req = urllib.request.Request(pic_url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=30) as resp:
        data = resp.read()
    with open(local_abs, "wb") as f:
        f.write(data)
    print(f"        · 已下载 {len(data)} 字节 -> {local_rel}")
    return local_rel


def process(text: str):
    # 按顶层作品对象分块：匹配 { id: N, ... }, （尽量宽松）
    # 使用正则找出每个作品块的起止，依靠 "id:" 与下一处平衡的 "}\n    }," 较难。
    # 改用：定位每个 trailerBvid 行，向前找最近的 "id:"，向后找该对象的结束 "},"。
    results = []

    # 找到所有 trailerBvid 行
    bvid_re = re.compile(r"trailerBvid:\s*'([^']*)'")
    id_re = re.compile(r"id:\s*(\d+)")
    thumb_re = re.compile(r"thumb:\s*'([^']*)'")
    # 作品对象结束标志：行首 "    }," （4空格 + },）
    block_end_re = re.compile(r"\n    },", re.M)

    for m in bvid_re.finditer(text):
        bvid = m.group(1).strip()
        if not bvid:
            continue
        # 向上找最近的 id（本块起点，thumb 可能在 trailerBvid 之前）
        id_match = None
        for im in id_re.finditer(text[: m.start()]):
            id_match = im  # 取最后一个
        wid = id_match.group(1) if id_match else "?"
        block_start = id_match.start() if id_match else 0

        # 向下找本块结束：第一个 "\n    },"（在 trailerBvid 之后）
        be = block_end_re.search(text, m.start())
        block_end = be.start() if be else len(text)
        block = text[block_start:block_end]

        tm = thumb_re.search(block)
        thumb_val = tm.group(1) if tm else None
        # thumb 在全文中的绝对位置，供替换使用
        thumb_abs = (block_start + tm.start()) if tm else None

        results.append({
            "id": wid,
            "bvid": bvid,
            "thumb_val": thumb_val,
            "bvid_match": m,
            "thumb_abs": thumb_abs,
            "block_end": block_end,
        })
    return results


def main():
    with open(MAIN_JS, "r", encoding="utf-8") as f:
        text = f.read()

    items = process(text)
    if not items:
        print("未找到任何 trailerBvid，无需更新。")
        return

    changed = 0
    # 从后往前替换，避免偏移
    for it in reversed(items):
        wid, bvid = it["id"], it["bvid"]
        try:
            pic = fetch_pic(bvid)
        except Exception as e:
            print(f"[跳过] 作品 {wid} (BV{bvid}): {e}")
            continue

        # 目标本地路径
        target_rel = f"{COVERS_PREFIX}{bvid}.jpg"

        thumb_val = it["thumb_val"]
        if thumb_val is not None:
            # 已有本脚本管理的本地封面 -> 幂等跳过
            if thumb_val == target_rel:
                print(f"[保留] 作品 {wid}: 已是本地封面 {target_rel}")
                continue
            is_local = thumb_val.startswith(LOCAL_PREFIXES)
            is_bili = bool(BILI_PATTERN.match(thumb_val))
            # 手工指定的本地封面（非 covers/ 目录）-> 不覆盖
            if is_local and not is_bili and not thumb_val.startswith(COVERS_PREFIX):
                print(f"[保留] 作品 {wid}: 已有本地封面 {thumb_val}，不覆盖。")
                continue
            # 其余情况（远程 B站 / 旧远程 URL）-> 下载并写本地路径
            local_rel = download_cover(bvid, pic)
            abs_start = it["thumb_abs"]
            nl = text.find("\n", abs_start)
            abs_end = nl if nl != -1 else len(text)
            text = text[:abs_start] + f"thumb: '{local_rel}'" + text[abs_end:]
            print(f"[更新] 作品 {wid}: {thumb_val} -> {local_rel}")
            changed += 1
        else:
            # 没有 thumb -> 下载并插入
            local_rel = download_cover(bvid, pic)
            ins_pos = it["bvid_match"].end()
            nl = text.find("\n", ins_pos)
            if nl == -1:
                nl = len(text)
            # 确保 trailerBvid 行末尾有逗号，否则插入 thumb 会导致 JS 语法错误
            prev_line = text[ins_pos:nl]
            if not prev_line.rstrip().endswith(","):
                text = text[:nl] + "," + text[nl:]
                nl += 1
            insert_text = "\n        thumb: '" + local_rel + "'"
            text = text[:nl] + insert_text + text[nl:]
            print(f"[插入] 作品 {wid}: 新增 thumb -> {local_rel}")
            changed += 1

    if changed:
        with open(MAIN_JS, "w", encoding="utf-8") as f:
            f.write(text)
        print(f"\n完成：共更新 {changed} 个作品的封面。已写回 {MAIN_JS}")
    else:
        print("\n没有需要变更的封面。")


if __name__ == "__main__":
    main()
