import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

await page.goto('http://localhost:5173/__flowing-test', { waitUntil: 'networkidle0' });

// In the browser, let's attach a MutationObserver or style inspector on .flowing-menu__band
await page.evaluate(() => {
  window.__bandLog = [];
  const bands = document.querySelectorAll('.flowing-menu__band');
  bands.forEach((b, i) => {
    const origSet = b.style.setProperty.bind(b.style);
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(m => {
        if (m.attributeName === 'style') {
          window.__bandLog.push({
            time: performance.now(),
            index: i,
            visibility: b.style.visibility,
            clipPath: b.style.clipPath
          });
        }
      });
    });
    observer.observe(b, { attributes: true, attributeFilter: ['style'] });
  });
});

// Wait for intro to finish (intro takes ~1.5s)
await new Promise(r => setTimeout(r, 2000));

// Now move mouse to row 0
const rows = await page.$$('.flowing-menu__item');
const box = await rows[0].boundingBox();
console.log('Moving mouse to row 0:', box);
await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);

// Keep mouse moving slightly to keep pointermove firing
for (let i = 0; i < 10; i++) {
  await page.mouse.move(box.x + box.width / 2 + i * 2, box.y + box.height / 2);
  await new Promise(r => setTimeout(r, 50));
}

await new Promise(r => setTimeout(r, 200));

const log = await page.evaluate(() => {
  return window.__bandLog;
});

console.log('Mutation log count:', log.length);
console.log('Last 20 mutations:', log.slice(-20));

await page.screenshot({ path: 'd:\\RP portfolio rebuild\\rp-portfolio\\qa\\isolation-test-after-intro.png' });
console.log('Saved qa/isolation-test-after-intro.png');

await browser.close();
