import os
from PIL import Image, ImageDraw, ImageFont

os.makedirs('public/projects', exist_ok=True)
W, H = 1200, 800

def get_font(size, bold=False):
    # Try system fonts
    font_names = ["segoeui.ttf", "arial.ttf", "calibri.ttf"]
    if bold:
        font_names = ["segouib.ttf", "arialbd.ttf", "calibrib.ttf"]
    for name in font_names:
        try:
            return ImageFont.truetype(f"C:/Windows/Fonts/{name}", size)
        except:
            continue
    return ImageFont.load_default()

# Font definitions
font_title = get_font(42, bold=True)
font_sub = get_font(22, bold=False)
font_mono = get_font(18, bold=True)
font_body = get_font(18, bold=False)
font_small = get_font(15, bold=False)

# 1. THINKO AI
def create_thinko():
    im = Image.new('RGB', (W, H), color='#15121E')
    draw = ImageDraw.Draw(im)

    # Ambient subtle background gradient
    for y in range(H):
        ratio = y / H
        r = int(21 + ratio * 12)
        g = int(18 + ratio * 8)
        b = int(30 + ratio * 20)
        draw.line([(0, y), (W, y)], fill=(r, g, b))

    # Inner app window (full-bleed modern canvas with 24px margins)
    draw.rounded_rectangle([(24, 24), (W - 24, H - 24)], radius=24, fill='#1B1726', outline='#312B42', width=2)

    # Title bar
    draw.rectangle([(24, 24), (W - 24, 88)], fill='#221D30')
    draw.line([(24, 88), (W - 24, 88)], fill='#362F4A', width=1)
    # Window controls (macOS style)
    draw.ellipse([(52, 48), (66, 62)], fill='#FF5F56')
    draw.ellipse([(76, 48), (90, 62)], fill='#FFBD2E')
    draw.ellipse([(100, 48), (114, 62)], fill='#27C93F')

    draw.text((140, 44), "Thinko AI  —  Intelligent Real-time Chat Platform", fill='#EDEBE6', font=font_sub)
    draw.text((W - 220, 47), "FLASK + NVIDIA LLAMA", fill='#9691A4', font=font_small)

    # Content Area: Chat conversation layout
    # User message bubble
    draw.rounded_rectangle([(W - 540, 130), (W - 60, 210)], radius=16, fill='#3D3556')
    draw.text((W - 515, 148), "Analyze system logs and summarize latency anomalies.", fill='#FFFFFF', font=font_body)
    draw.text((W - 515, 178), "User · 10:42 AM", fill='#ADA8BE', font=font_small)

    # AI Response Card
    draw.rounded_rectangle([(60, 240), (W - 140, 560)], radius=20, fill='#231E33', outline='#433A5C', width=1)
    # AI Header badge
    draw.rounded_rectangle([(84, 264), (280, 302)], radius=8, fill='#4C3F75')
    draw.text((98, 272), "⚡ Llama 3.3 70B · 18ms", fill='#EAE6F8', font=font_small)
    draw.text((300, 273), "Status: Real-time Firebase Sync Active", fill='#70C79A', font=font_small)

    draw.text((84, 330), "Log Summary & Latency Diagnostics:", fill='#EDEBE6', font=font_sub)
    draw.text((84, 380), "• Identified 3 microservice timeouts in payment webhook dispatch.", fill='#C5BFD4', font=font_body)
    draw.text((84, 420), "• Model inference response streamed via Flask SSE in 240ms.", fill='#C5BFD4', font=font_body)
    draw.text((84, 460), "• Automated Firebase state mutation confirmed across 12 connected clients.", fill='#C5BFD4', font=font_body)

    # Input bar at bottom
    draw.rounded_rectangle([(60, 640), (W - 60, 720)], radius=18, fill='#252035', outline='#4A3F66', width=2)
    draw.text((90, 668), "Ask Thinko AI anything or input backend data stream...", fill='#7E7792', font=font_body)
    draw.rounded_rectangle([(W - 160, 654), (W - 80, 706)], radius=12, fill='#7053DE')
    draw.text((W - 138, 668), "Send →", fill='#FFFFFF', font=font_small)

    im.save('public/projects/thinko-ai.png', 'PNG')

# 2. STUDENT MANAGEMENT APP
def create_student():
    im = Image.new('RGB', (W, H), color='#121820')
    draw = ImageDraw.Draw(im)

    for y in range(H):
        ratio = y / H
        r = int(18 + ratio * 8)
        g = int(24 + ratio * 12)
        b = int(32 + ratio * 16)
        draw.line([(0, y), (W, y)], fill=(r, g, b))

    draw.rounded_rectangle([(24, 24), (W - 24, H - 24)], radius=24, fill='#17212B', outline='#2A3D4F', width=2)

    # Header
    draw.rectangle([(24, 24), (W - 24, 88)], fill='#1D2A37')
    draw.line([(24, 88), (W - 24, 88)], fill='#2A3E52', width=1)
    draw.ellipse([(52, 48), (66, 62)], fill='#FF5F56')
    draw.ellipse([(76, 48), (90, 62)], fill='#FFBD2E')
    draw.ellipse([(100, 48), (114, 62)], fill='#27C93F')

    draw.text((140, 44), "Student Management System  —  Flutter & Supabase Dashboard", fill='#EDEBE6', font=font_sub)
    draw.text((W - 220, 47), "FLUTTER · FLASK · SUPABASE", fill='#7FA4C4', font=font_small)

    # 3 Stat Cards Row
    stats = [("Active Students", "1,248", "#2E5B82"), ("Cloud Media", "4.8 GB", "#246B5C"), ("Sync Latency", "32ms", "#5B448A")]
    for i, (title, val, color) in enumerate(stats):
        x1 = 60 + i * 370
        draw.rounded_rectangle([(x1, 120), (x1 + 340, 220)], radius=16, fill=color)
        draw.text((x1 + 24, 140), title, fill='#D4E4F2', font=font_small)
        draw.text((x1 + 24, 166), val, fill='#FFFFFF', font=font_title)

    # Student Table List Preview
    draw.rounded_rectangle([(60, 260), (W - 60, 720)], radius=20, fill='#1B2633', outline='#31475E', width=1)
    draw.text((90, 290), "Student Records Database", fill='#EDEBE6', font=font_sub)

    rows = [
        ("Aravind Kumar", "CSE · Year 3", "Enrolled", "#27C93F"),
        ("Priya Sharma", "IT · Year 2", "Enrolled", "#27C93F"),
        ("Rithick Prasath", "CSE · Year 1", "Honors", "#38A3F8"),
        ("Sneha Reddy", "ECE · Year 4", "Graduating", "#F5A623"),
    ]
    for idx, (name, dept, status, st_col) in enumerate(rows):
        y_pos = 350 + idx * 80
        draw.line([(90, y_pos), (W - 90, y_pos)], fill='#28394C', width=1)
        # Avatar circle
        draw.ellipse([(90, y_pos + 15), (135, y_pos + 60)], fill='#2A4056')
        draw.text((105, y_pos + 25), name[0], fill='#A8C5DE', font=font_body)

        draw.text((160, y_pos + 20), name, fill='#EDEBE6', font=font_body)
        draw.text((160, y_pos + 46), dept, fill='#849DAE', font=font_small)

        # Status badge
        draw.rounded_rectangle([(W - 240, y_pos + 24), (W - 120, y_pos + 56)], radius=12, fill='#1B3242', outline=st_col, width=1)
        draw.text((W - 210, y_pos + 31), status, fill=st_col, font=font_small)

    im.save('public/projects/student-management.png', 'PNG')

# 3. AI OS ASSISTANT
def create_os_assistant():
    im = Image.new('RGB', (W, H), color='#0E1218')
    draw = ImageDraw.Draw(im)

    for y in range(H):
        ratio = y / H
        r = int(14 + ratio * 8)
        g = int(18 + ratio * 10)
        b = int(24 + ratio * 14)
        draw.line([(0, y), (W, y)], fill=(r, g, b))

    draw.rounded_rectangle([(24, 24), (W - 24, H - 24)], radius=24, fill='#131821', outline='#242D3C', width=2)

    # Header
    draw.rectangle([(24, 24), (W - 24, 88)], fill='#18202A')
    draw.line([(24, 88), (W - 24, 88)], fill='#253040', width=1)
    draw.ellipse([(52, 48), (66, 62)], fill='#FF5F56')
    draw.ellipse([(76, 48), (90, 62)], fill='#FFBD2E')
    draw.ellipse([(100, 48), (114, 62)], fill='#27C93F')

    draw.text((140, 44), "AI OS Assistant  —  Autonomous Python & Ollama Agent", fill='#EDEBE6', font=font_sub)
    draw.text((W - 220, 47), "PYTHON · OLLAMA · PYAUTOGUI", fill='#63A894', font=font_small)

    # Terminal Window Container
    draw.rounded_rectangle([(60, 120), (W - 60, 720)], radius=18, fill='#0B0E14', outline='#1F2736', width=1)
    draw.text((90, 150), "user@autonomous-os:~$ python -m assistant.run --agent desktop", fill='#66C2A5', font=font_mono)
    draw.text((90, 190), "[Ollama] Model: mistral-7b-instruct-q4 initialized (VRAM 4.2 GB)", fill='#8DA0CB', font=font_mono)
    draw.text((90, 230), "[Screen] Captured 2560x1440 framebuffer in 12ms", fill='#8DA0CB', font=font_mono)
    draw.text((90, 270), "[Task] Command received: 'Organize desktop downloads into date folders'", fill='#E78AC3', font=font_mono)
    draw.text((90, 310), "[Action 1] Scan path ~/Downloads -> 48 files found", fill='#A6D854', font=font_mono)
    draw.text((90, 350), "[Action 2] PyAutoGUI coordinates verified (X: 1420, Y: 860)", fill='#A6D854', font=font_mono)
    draw.text((90, 390), "[Action 3] Moved 48 items -> verified hash integrity OK", fill='#A6D854', font=font_mono)
    draw.text((90, 430), "[Status] Workflow complete in 1.84 seconds. Idle state.", fill='#FFD92F', font=font_mono)

    # Live telemetry mini card inside terminal
    draw.rounded_rectangle([(90, 490), (W - 90, 680)], radius=14, fill='#131A24', outline='#2C374A', width=1)
    draw.text((120, 515), "AGENT TELEMETRY", fill='#7F97AD', font=font_small)
    metrics = [("Local LLM FPS", "42 tok/s"), ("Automation Delay", "4ms"), ("Safety Checks", "100% Passed"), ("Active Worker", "PID 2841")]
    for j, (k, v) in enumerate(metrics):
        x_m = 120 + j * 240
        draw.text((x_m, 555), k, fill='#9BA8B8', font=font_small)
        draw.text((x_m, 585), v, fill='#FFFFFF', font=font_sub)

    im.save('public/projects/ai-os-assistant.png', 'PNG')

create_thinko()
create_student()
create_os_assistant()
print("Successfully generated rich edge-to-edge project previews!")
