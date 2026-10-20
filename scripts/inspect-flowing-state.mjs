import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

await page.goto('http://localhost:5173/__flowing-test', { waitUntil: 'networkidle0' });

// Wait 2.5s for intro to completely settle
await new Promise(r => setTimeout(r, 2500));

const initial = await page.evaluate(() => {
  const fm = window.__flowingMenu;
  return {
    band: fm ? { ...fm.band.current } : null,
    metrics: fm ? fm.metrics.current : null,
    engine: fm ? { raf: fm.engine.current.raf, touched: fm.engine.current.touched } : null,
  };
});
console.log('After intro state:', initial);

// Now move mouse to row 0
const rows = await page.$$('.flowing-menu__item');
const box = await rows[0].boundingBox();

await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);

// Check 50ms after move
await new Promise(r => setTimeout(r, 50));
const duringMove = await page.evaluate(() => {
  const fm = window.__flowingMenu;
  return {
    band: fm ? { ...fm.band.current } : null,
    engine: fm ? { raf: fm.engine.current.raf, touched: fm.engine.current.touched } : null,
  };
});
console.log('50ms after hover:', duringMove);

// Check 300ms after move
await new Promise(r => setTimeout(r, 300));
const settledMove = await page.evaluate(() => {
  const fm = window.__flowingMenu;
  const bands = Array.from(document.querySelectorAll('.flowing-menu__band'));
  return {
    band: fm ? { ...fm.band.current } : null,
    engine: fm ? { raf: fm.engine.current.raf, touched: fm.engine.current.touched } : null,
    bands: bands.map(b => ({
      vis: b.style.visibility,
      clip: b.style.clipPath
    }))
  };
});
console.log('350ms after hover:', settledMove);

await page.screenshot({ path: 'd:\\RP portfolio rebuild\\rp-portfolio\\qa\\isolation-hover-settled.png' });
console.log('Screenshot saved to qa/isolation-hover-settled.png');

await browser.close();
