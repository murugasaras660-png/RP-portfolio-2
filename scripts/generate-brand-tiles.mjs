import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer-core';

const brandsDir = 'd:/RP portfolio rebuild/rp-portfolio/public/brands';
if (!fs.existsSync(brandsDir)) {
  fs.mkdirSync(brandsDir, { recursive: true });
}

// 660x300 SVGs with #E4E1DA background, subtle grain, and #16131C centered glyph (~55% height)
const brandDefs = [
  {
    name: 'email',
    // Mail glyph centered in 660x300, glyph height ~90px (approx 55% of central scale)
    svgContent: `
      <svg xmlns="http://www.w3.org/2000/svg" width="660" height="300" viewBox="0 0 660 300">
        <defs>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.05 0" />
            <feComposite in2="SourceGraphic" in="glitch" operator="in" />
          </filter>
        </defs>
        <rect width="660" height="300" fill="#E4E1DA" />
        <rect width="660" height="300" fill="#16131C" opacity="0.03" filter="url(#grain)" />
        <g transform="translate(330, 150) scale(4)" fill="#16131C">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" transform="translate(-12, -12)" />
        </g>
      </svg>
    `
  },
  {
    name: 'linkedin',
    svgContent: `
      <svg xmlns="http://www.w3.org/2000/svg" width="660" height="300" viewBox="0 0 660 300">
        <defs>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.05 0" />
            <feComposite in2="SourceGraphic" in="glitch" operator="in" />
          </filter>
        </defs>
        <rect width="660" height="300" fill="#E4E1DA" />
        <rect width="660" height="300" fill="#16131C" opacity="0.03" filter="url(#grain)" />
        <g transform="translate(330, 150) scale(3.8)" fill="#16131C">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.89 0 1.61-.72 1.61-1.61s-.72-1.61-1.61-1.61a1.61 1.61 0 0 0 0 3.22m1.4 9.74V9.89H5.06v8.61h2.8z" transform="translate(-12, -12)" />
        </g>
      </svg>
    `
  },
  {
    name: 'github',
    svgContent: `
      <svg xmlns="http://www.w3.org/2000/svg" width="660" height="300" viewBox="0 0 660 300">
        <defs>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.05 0" />
            <feComposite in2="SourceGraphic" in="glitch" operator="in" />
          </filter>
        </defs>
        <rect width="660" height="300" fill="#E4E1DA" />
        <rect width="660" height="300" fill="#16131C" opacity="0.03" filter="url(#grain)" />
        <g transform="translate(330, 150) scale(3.8)" fill="#16131C">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" transform="translate(-12, -12)" />
        </g>
      </svg>
    `
  },
  {
    name: 'resume',
    svgContent: `
      <svg xmlns="http://www.w3.org/2000/svg" width="660" height="300" viewBox="0 0 660 300">
        <defs>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.05 0" />
            <feComposite in2="SourceGraphic" in="glitch" operator="in" />
          </filter>
        </defs>
        <rect width="660" height="300" fill="#E4E1DA" />
        <rect width="660" height="300" fill="#16131C" opacity="0.03" filter="url(#grain)" />
        <g transform="translate(330, 150) scale(3.8)" fill="#16131C">
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" transform="translate(-12, -12)" />
        </g>
      </svg>
    `
  }
];

// Write SVGs
for (const b of brandDefs) {
  const filePath = path.join(brandsDir, `${b.name}.svg`);
  fs.writeFileSync(filePath, b.svgContent.trim(), 'utf8');
  console.log('Wrote', filePath);
}

// Generate PNG fallbacks using puppeteer
const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});

const page = await browser.newPage();
await page.setViewport({ width: 660, height: 300, deviceScaleFactor: 2 });

for (const b of brandDefs) {
  await page.setContent(b.svgContent.trim());
  const pngPath = path.join(brandsDir, `${b.name}.png`);
  await page.screenshot({ path: pngPath, omitBackground: false });
  console.log('Wrote PNG', pngPath);
}

await browser.close();
console.log('All brand logo tiles generated successfully!');
