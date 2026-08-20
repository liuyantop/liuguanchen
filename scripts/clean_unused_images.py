#!/usr/bin/env python3
"""删除未被代码引用的图片文件（保留 <picture> fallback 所需的 jpg）。"""
import os
import re

ROOT = '/workspace'

refs = set()
for f in ['index.html', 'js/main.js', 'css/style.css']:
    txt = open(os.path.join(ROOT, f), encoding='utf-8').read()
    refs.update(re.findall(r'assets/[\w\-./]*\.(?:jpg|webp|png)', txt))

disk = set()
for root, dirs, files in os.walk(os.path.join(ROOT, 'assets')):
    for f in files:
        if f.endswith(('.jpg', '.webp', '.png')):
            disk.add(os.path.join(root, f).replace('\\', '/').replace(ROOT + '/', ''))

unused = sorted(disk - refs)
deleted_size = 0
for p in unused:
    deleted_size += os.path.getsize(os.path.join(ROOT, p))
    os.remove(os.path.join(ROOT, p))
    print(f'删除: {p}')

print(f'\n=== 已删除 {len(unused)} 个文件, 释放 {deleted_size / 1048576:.2f} MB ===')
