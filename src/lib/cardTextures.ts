import QRCode from 'qrcode';
import { SITE } from '@/data/content';

let cachedTextures: { frontImage: string; backImage: string; strapImage: string } | null = null;

export async function getCardTextures(): Promise<{
  frontImage: string;
  backImage: string;
  strapImage: string;
}> {
  if (cachedTextures) {
    return cachedTextures;
  }

  // Ensure fonts are loaded if supported
  try {
    if (document.fonts) {
      await document.fonts.ready;
    }
  } catch {
    // continue
  }

  const frontImage = await generateFrontFace();
  const backImage = await generateBackFace();
  const strapImage = generateStrap();

  cachedTextures = { frontImage, backImage, strapImage };
  return cachedTextures;
}

function generateStrap(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 160;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Background
  ctx.fillStyle = '#1D1A26';
  ctx.fillRect(0, 0, 1200, 160);

  // Subtle border lines
  ctx.strokeStyle = 'rgba(237, 235, 230, 0.12)';
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, 1200, 160);

  // Repeated strap text
  ctx.fillStyle = 'rgba(237, 235, 230, 0.55)';
  ctx.font = '600 36px "Geist Mono Variable", monospace, sans-serif';
  ctx.textBaseline = 'middle';

  const patternText = 'RP   /   RITHICK PRASATH   /   B.TECH CSE \'28   /   ';
  let x = 10;
  while (x < 1200) {
    ctx.fillText(patternText, x, 80);
    x += ctx.measureText(patternText).width;
  }

  return canvas.toDataURL('image/png');
}

async function generateFrontFace(): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1440;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Card background: #F2F1EE (Warm paper)
  ctx.fillStyle = '#F2F1EE';
  ctx.fillRect(0, 0, 1024, 1440);

  // Subtle fine luxury grain/border inside card edge
  ctx.strokeStyle = 'rgba(22, 19, 28, 0.08)';
  ctx.lineWidth = 4;
  ctx.strokeRect(20, 20, 1024 - 40, 1440 - 40);

  // Top header labels (aligned near slot center y = 83px, keeping clamp slot clear)
  // Left: faint RP monogram
  ctx.fillStyle = 'rgba(22, 19, 28, 0.10)';
  ctx.font = '700 38px "Geist Variable", sans-serif';
  ctx.textBaseline = 'middle';
  ctx.fillText('RP', 70, 85);

  // Right: B.TECH CSE '28 in Geist Mono
  ctx.fillStyle = '#6E6B78';
  ctx.font = '500 28px "Geist Mono Variable", monospace, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText("B.TECH CSE '28", 1024 - 70, 85);
  ctx.textAlign = 'left';

  // Hairline under top header
  ctx.strokeStyle = 'rgba(22, 19, 28, 0.08)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(70, 150);
  ctx.lineTo(1024 - 70, 150);
  ctx.stroke();

  // Try to load portrait photo
  let portraitLoaded = false;
  try {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/profile/rp-portrait.png';
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    // Draw portrait cut-out with grayscale & contrast filter
    ctx.save();
    ctx.filter = 'grayscale(1) contrast(1.15)';
    const targetH = 1440 * 0.70; // 70% height
    const aspect = img.width / img.height;
    const targetW = targetH * aspect;
    const drawX = (1024 - targetW) / 2;
    const drawY = 1440 - targetH - 120;
    ctx.drawImage(img, drawX, drawY, targetW, targetH);
    ctx.restore();
    portraitLoaded = true;
  } catch {
    // Portrait not provided yet: draw luxury monogram
    console.info('[RP Portfolio] /profile/rp-portrait.png not supplied yet; rendering luxury monogram.');
  }

  if (!portraitLoaded) {
    // Luxury geometric emblem / monogram fallback
    const centerX = 512;
    const centerY = 720;

    ctx.strokeStyle = 'rgba(22, 19, 28, 0.15)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 240, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(22, 19, 28, 0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 280, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#16131C';
    ctx.font = '800 180px "Geist Variable", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('RP', centerX, centerY);

    ctx.font = '500 32px "Geist Mono Variable", monospace, sans-serif';
    ctx.fillStyle = '#6E6B78';
    ctx.fillText('IDENTITY VERIFIED', centerX, centerY + 140);
  }

  // Bottom-left info
  ctx.textAlign = 'left';
  ctx.fillStyle = '#16131C';
  ctx.font = '600 32px "Geist Mono Variable", monospace, sans-serif';
  ctx.fillText('RITHICK PRASATH', 70, 1330);

  ctx.fillStyle = '#6E6B78';
  ctx.font = '500 24px "Geist Mono Variable", monospace, sans-serif';
  ctx.fillText('DEVELOPER & CSE STUDENT', 70, 1370);

  // Bottom-right signature barcode decoration
  ctx.fillStyle = 'rgba(22, 19, 28, 0.25)';
  const barX = 1024 - 240;
  const barY = 1320;
  for (let i = 0; i < 28; i++) {
    const w = (i % 3 === 0) ? 5 : (i % 2 === 0 ? 3 : 2);
    ctx.fillRect(barX + i * 6, barY, w, 44);
  }

  return canvas.toDataURL('image/png');
}

async function generateBackFace(): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1440;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Background #F2F1EE
  ctx.fillStyle = '#F2F1EE';
  ctx.fillRect(0, 0, 1024, 1440);

  // Subtle border
  ctx.strokeStyle = 'rgba(22, 19, 28, 0.08)';
  ctx.lineWidth = 4;
  ctx.strokeRect(20, 20, 1024 - 40, 1440 - 40);

  // Top header: keep 200px clear for clamp
  ctx.fillStyle = '#6E6B78';
  ctx.font = '500 26px "Geist Mono Variable", monospace, sans-serif';
  ctx.textBaseline = 'middle';
  ctx.fillText('COMMUNICATION & IDENTITY', 70, 85);

  ctx.strokeStyle = 'rgba(22, 19, 28, 0.08)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(70, 150);
  ctx.lineTo(1024 - 70, 150);
  ctx.stroke();

  // Heading: "Let's talk."
  ctx.fillStyle = '#16131C';
  ctx.font = '700 96px "Geist Variable", sans-serif';
  ctx.fillText("Let's talk.", 70, 280);

  // Contact detail rows
  const rows = [
    { label: 'EMAIL', value: SITE.email },
    { label: 'LINKEDIN', value: SITE.linkedin },
    { label: 'GITHUB', value: SITE.github },
    { label: 'RESUME', value: 'rpportfolio01.netlify.app/resume.pdf' },
    { label: 'LOCATION', value: SITE.location },
  ];

  let currentY = 400;
  rows.forEach((row) => {
    // Divider line
    ctx.strokeStyle = 'rgba(22, 19, 28, 0.10)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(70, currentY);
    ctx.lineTo(1024 - 70, currentY);
    ctx.stroke();

    currentY += 40;

    // Label
    ctx.fillStyle = '#6E6B78';
    ctx.font = '600 24px "Geist Mono Variable", monospace, sans-serif';
    ctx.fillText(row.label, 70, currentY);

    // Value
    ctx.fillStyle = '#16131C';
    ctx.font = '500 28px "Geist Mono Variable", monospace, sans-serif';
    ctx.fillText(row.value, 260, currentY);

    currentY += 50;
  });

  // Final divider line
  ctx.strokeStyle = 'rgba(22, 19, 28, 0.10)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(70, currentY);
  ctx.lineTo(1024 - 70, currentY);
  ctx.stroke();

  // Generate QR code of SITE.url
  try {
    const qrCanvas = document.createElement('canvas');
    await QRCode.toCanvas(qrCanvas, SITE.url, {
      width: 280,
      margin: 1,
      color: {
        dark: '#16131C',
        light: '#F2F1EE',
      },
    });

    const qrX = 1024 - 360;
    const qrY = 1440 - 400;

    // QR container frame
    ctx.strokeStyle = 'rgba(22, 19, 28, 0.15)';
    ctx.lineWidth = 2;
    ctx.strokeRect(qrX - 10, qrY - 10, 300, 300);

    ctx.drawImage(qrCanvas, qrX, qrY, 280, 280);

    ctx.fillStyle = '#6E6B78';
    ctx.font = '500 20px "Geist Mono Variable", monospace, sans-serif';
    ctx.fillText('SCAN FOR DIGITAL CARD', qrX - 10, qrY + 325);
  } catch (err) {
    console.error('QR code generation error:', err);
  }

  // Bottom notice
  ctx.fillStyle = '#6E6B78';
  ctx.font = '500 22px "Geist Mono Variable", monospace, sans-serif';
  ctx.fillText('RITHICK PRASATH — PORTFOLIO 2026', 70, 1370);

  return canvas.toDataURL('image/png');
}
