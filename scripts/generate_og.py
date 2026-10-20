import os
from PIL import Image, ImageDraw

os.makedirs('public', exist_ok=True)

# Generate OG Image 1200x630
W, H = 1200, 630
im = Image.new('RGB', (W, H), color='#120F17')
draw = ImageDraw.Draw(im)

for y in range(H):
    ratio = y / H
    r = int(18 + ratio * 9)
    g = int(15 + ratio * 9)
    b = int(23 + ratio * 12)
    draw.line([(0, y), (W, y)], fill=(r, g, b))

# Subtle grid
for x in range(40, W, 80):
    draw.line([(x, 40), (x, H - 40)], fill=(32, 28, 40))
for y in range(40, H, 80):
    draw.line([(40, y), (W - 40, y)], fill=(32, 28, 40))

draw.rounded_rectangle([(40, 40), (W - 40, H - 40)], radius=24, outline=(60, 56, 72), width=1)
draw.text((100, 100), "RP. / 2026", fill=(161, 158, 171))
draw.text((100, 240), "RITHICK PRASATH", fill=(237, 235, 230))
draw.text((100, 320), "CSE STUDENT · BUILDER · LEARNER", fill=(161, 158, 171))
draw.text((100, 390), "B.Tech CSE, Bharath University (Class of 2028)", fill=(110, 107, 120))
draw.text((100, 480), "https://rpportfolio01.netlify.app", fill=(237, 235, 230))

im.save('public/og.png', 'PNG')
print("Saved public/og.png")
