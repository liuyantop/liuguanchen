#!/usr/bin/env python3
"""将站点引用的位图转码为 WebP（保留原图作为回退）。

用法:
    python scripts/convert_to_webp.py

- 仅处理实际被站点引用的图片（见 TARGETS），跳过 iphi_raw/ 源素材与 .bak。
- 输出同名 .webp 到相同目录。
- 使用 Pillow 的无损/有损 WebP：照片类用 quality=82，插画/带文字类用 lossless=True。
"""
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# 站点实际引用的位图（相对 ROOT）
TARGETS = [
    "assets/profile.jpg",
    "assets/iphi/poster.jpg",
    "assets/covers/BV1NAbS6xEXT.jpg",
    "assets/covers/BV1SvbS6YEiv.jpg",
    "assets/iphi/char-dion.png",
    "assets/iphi/char-expressions.png",
    "assets/iphi/char-gia.png",
    "assets/iphi/char-iphi.png",
    "assets/iphi/char-janus.png",
    "assets/iphi/char-lock.png",
    "assets/iphi/char-reta.png",
    "assets/iphi/char-themis.png",
    "assets/iphi/room-day1.png",
    "assets/iphi/room-day2.png",
    "assets/iphi/room-day3.png",
    "assets/iphi/scene-office.png",
    "assets/iphi/scene-room.jpeg",
    "assets/iphi/scene-subway.png",
    "assets/iphi/battle-dion-lock.png",
    "assets/iphi/battle-reta.png",
    "assets/iphi/battle-gia.png",
]

# 带文字/线条的 UI 类图片用无损，照片类用有损
LOSSLESS = {
    "assets/iphi/char-expressions.png",
    "assets/iphi/battle-dion-lock.png",
    "assets/iphi/battle-reta.png",
    "assets/iphi/battle-gia.png",
}


def main():
    total_saved = 0
    for rel in TARGETS:
        src = os.path.join(ROOT, rel)
        if not os.path.exists(src):
            print(f"[skip] 不存在: {rel}")
            continue
        out = os.path.splitext(src)[0] + ".webp"
        if os.path.exists(out):
            print(f"[skip] 已存在: {rel} -> .webp")
            continue
        with Image.open(src) as im:
            im = im.convert("RGB") if im.mode in ("P", "RGBA", "LA") else im
            if rel in LOSSLESS:
                im.save(out, "WEBP", lossless=True, method=4)
            else:
                im.save(out, "WEBP", quality=82, method=4)
        before = os.path.getsize(src)
        after = os.path.getsize(out)
        total_saved += before - after
        print(f"[ok]   {rel}: {before//1024}KB -> {after//1024}KB "
              f"(节省 {(before-after)/before*100:.0f}%)")
    print(f"\n合计节省约 {total_saved//1024} KB")


if __name__ == "__main__":
    main()
