#!/usr/bin/env python3
"""压缩超过 150KB 的图片（webp quality=72 / jpg quality=80），降低页面加载体积。"""
import os
from PIL import Image

ROOT = '/workspace'

TARGETS = [
    'assets/decompression-island/exhibition.webp',
    'assets/decompression-island/scene-crystal.webp',
    'assets/relaxing-travel/poster-2.webp',
    'assets/relaxing-travel/scene-torii.webp',
    'assets/decompression-island/vr-test.webp',
    'assets/decompression-island/scene-main.webp',
    'assets/relaxing-travel/poster-1.webp',
    'assets/iphi/poster.jpg',
    'assets/decompression-island/scene-sky.webp',
    'assets/iphi/battle-gia.webp',
    'assets/relaxing-travel/scene-cave.webp',
    'assets/decompression-island/app-mockup.webp',
]

print('=== 压缩中... ===')
for rel in TARGETS:
    p = os.path.join(ROOT, rel)
    before = os.path.getsize(p)
    img = Image.open(p)
    img.load()
    if img.mode != 'RGB':
        img = img.convert('RGB')
    tmp = p + '.tmp'
    if rel.endswith('.webp'):
        img.save(tmp, 'WEBP', quality=72, method=6)
    else:
        img.save(tmp, 'JPEG', quality=80, optimize=True, progressive=True)
    after = os.path.getsize(tmp)
    os.replace(tmp, p)
    print(f'{rel}: {before/1024:.1f} KB -> {after/1024:.1f} KB ({100 - after/before*100:.0f}% 减少)')

print('\n=== 完成 ===')
