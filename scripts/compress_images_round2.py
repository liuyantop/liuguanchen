#!/usr/bin/env python3
"""第二轮压缩：对超大分辨率图限制最大边 2000px，其余降 quality，目标全部 <=150KB。"""
import os
from PIL import Image

ROOT = '/workspace'

# (路径, 最大边限制, quality)；max_edge=None 表示不缩放
TARGETS = [
    ('assets/decompression-island/exhibition.webp', 2000, 72),
    ('assets/decompression-island/scene-crystal.webp', None, 62),
    ('assets/relaxing-travel/poster-2.webp', 1800, 70),
    ('assets/relaxing-travel/scene-torii.webp', None, 60),
    ('assets/decompression-island/vr-test.webp', 2000, 70),
    ('assets/decompression-island/scene-main.webp', None, 60),
]

print('=== 第二轮压缩 ===')
for rel, max_edge, quality in TARGETS:
    p = os.path.join(ROOT, rel)
    before = os.path.getsize(p)
    img = Image.open(p)
    img.load()
    if img.mode != 'RGB':
        img = img.convert('RGB')
    w, h = img.size
    if max_edge and max(w, h) > max_edge:
        ratio = max_edge / max(w, h)
        img = img.resize((int(w * ratio), int(h * ratio)), Image.LANCZOS)
        print(f'{rel}: 缩放 {w}x{h} -> {img.width}x{img.height}')
    tmp = p + '.tmp'
    img.save(tmp, 'WEBP', quality=quality, method=6)
    after = os.path.getsize(tmp)
    os.replace(tmp, p)
    print(f'{rel}: {before/1024:.1f} KB -> {after/1024:.1f} KB')

print('\n=== 完成 ===')
