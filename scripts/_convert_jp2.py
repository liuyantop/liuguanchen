# -*- coding: utf-8 -*-
import os, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
from PIL import Image

src = os.path.join(os.environ.get('TEMP', '/tmp'), 'baishe_imgs')
out = os.path.join(os.environ.get('TEMP', '/tmp'), 'baishe_imgs_png')
os.makedirs(out, exist_ok=True)
for fn in sorted(os.listdir(src)):
    if fn.lower().endswith('.jp2'):
        try:
            im = Image.open(os.path.join(src, fn))
            im = im.convert('RGB')
            im.thumbnail((1100, 1100))
            im.save(os.path.join(out, fn[:-4] + '.jpg'), 'JPEG', quality=85)
            print('OK', fn, im.size)
        except Exception as e:
            print('FAIL', fn, e)
