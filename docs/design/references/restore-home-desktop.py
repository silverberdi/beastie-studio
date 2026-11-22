#!/usr/bin/env python3
"""Rebuild the exact exported Stitch Home Desktop PNG from checked-in Base64 chunks."""
from pathlib import Path
import base64
import struct

root = Path(__file__).resolve().parent
parts = sorted((root / "source").glob("home-desktop.png.b64.part-*"))
if len(parts) != 13:
    raise SystemExit(f"Expected 13 PNG chunks, found {len(parts)}")
encoded = "".join(p.read_text(encoding="ascii").strip() for p in parts)
if len(encoded) != 8424256:
    raise SystemExit(f"Unexpected source length: {len(encoded)}")
image = base64.b64decode(encoded, validate=True)
if not image.startswith(b"\x89PNG\r\n\x1a\n"):
    raise SystemExit("Invalid PNG signature")
width, height = struct.unpack(">II", image[16:24])
if (width, height) != (2560, 8710):
    raise SystemExit(f"Unexpected dimensions: {width}x{height}")
out = root / "home-desktop.png"
out.write_bytes(image)
print(f"Restored {out} ({width}x{height}, {len(image)} bytes)")
