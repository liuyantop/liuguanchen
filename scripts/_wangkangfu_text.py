# -*- coding: utf-8 -*-
"""临时脚本：提取 The story of wangkangfu.pdf 的文本。"""
import sys
sys.stdout.reconfigure(encoding='utf-8')

try:
    import pymupdf
except ImportError:
    print("NO_PYMUPDF")
    sys.exit(1)

PDF = r"E:\LIUGUANCHEN\The story of wangkangfu.pdf"
doc = pymupdf.open(PDF)
print(f"TOTAL_PAGES={doc.page_count}")

for i, page in enumerate(doc):
    text = page.get_text().strip()
    lines = [l.strip() for l in text.splitlines() if l.strip()]
    print(f"\n{'='*60}\n=== 第 {i+1} 页 ===\n{'='*60}")
    for line in lines:
        print(line)
