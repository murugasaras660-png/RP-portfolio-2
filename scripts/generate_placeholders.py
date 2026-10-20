import os
from PIL import Image, ImageDraw, ImageFont

os.makedirs('public/projects', exist_ok=True)

projects = [
    {
        'filename': 'public/projects/thinko-ai.png',
        'title': 'THINKO AI',
        'tech': 'Flask · NVIDIA Llama · Firebase',
        'sub': 'Real-time AI Chat & Intelligence Interface'
    },
    {
        'filename': 'public/projects/student-management.png',
        'title': 'STUDENT MANAGEMENT',
        'tech': 'Flutter · Flask · Supabase · Cloudinary',
        'sub': 'Mobile & Cloud Education System'
    },
    {
        'filename': 'public/projects/ai-os-assistant.png',
        'title': 'AI OS ASSISTANT',
        'tech': 'Python · Ollama · PyAutoGUI',
        'sub': 'Local Autonomous Desktop Controller'
    }
]

W, H = 1200, 900

for p in projects:
    im = Image.new('RGB', (W, H), color='#120F17')
    draw = ImageDraw.Draw(im)

    # Gradient-like subtle tone steps
    for y in range(H):
        ratio = y / H
        r = int(18 + ratio * 9)   # #12 to #1B
        g = int(15 + ratio * 9)   # #0F to #18
        b = int(23 + ratio * 12)  # #17 to #23
        draw.line([(0, y), (W, y)], fill=(r, g, b))

    # Architectural grid lines
    line_col = (237, 235, 230, 20)
    for x in range(60, W, 100):
        draw.line([(x, 60), (x, H - 60)], fill=(40, 36, 50))
    for y in range(60, H, 100):
        draw.line([(60, y), (W - 60, y)], fill=(40, 36, 50))

    # Outer border
    draw.rounded_rectangle([(60, 60), (W - 60, H - 60)], radius=24, outline=(70, 66, 82), width=2)
    # Inner card frame
    draw.rounded_rectangle([(120, 120), (W - 120, H - 120)], radius=18, outline=(100, 96, 115), width=1)

    # Texts
    # Top badge
    draw.text((160, 160), "PROJECT / 0" + str(projects.index(p) + 1), fill=(161, 158, 171))
    draw.text((W - 320, 160), "PORTFOLIO ARCHIVE", fill=(110, 107, 120))

    # Main titles
    draw.text((160, 360), p['title'], fill=(237, 235, 230))
    draw.text((160, 440), p['sub'], fill=(161, 158, 171))

    # Tech stack tag
    draw.rounded_rectangle([(160, 560), (760, 630)], radius=12, fill=(24, 21, 32), outline=(70, 66, 82), width=1)
    draw.text((190, 582), p['tech'], fill=(237, 235, 230))

    # Watermark
    draw.text((W - 240, H - 180), "RP. 2026", fill=(110, 107, 120))

    im.save(p['filename'], 'PNG')
    print("Saved", p['filename'])
