import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

page.on('console', msg => console.log('BROWSER:', msg.text()));

await page.goto('http://localhost:5173/__flowing-test', { waitUntil: 'networkidle0' });

// Check what happens inside React component by exposing internals or inspecting DOM
const state = await page.evaluate(() => {
  const root = document.querySelector('.flowing-menu');
  const list = document.querySelector('.flowing-menu__list');
  const items = Array.from(document.querySelectorAll('.flowing-menu__item'));
  const links = Array.from(document.querySelectorAll('.flowing-menu__link'));
  const bands = Array.from(document.querySelectorAll('.flowing-menu__band'));
  
  return {
    rootRect: root.getBoundingClientRect(),
    listRect: list.getBoundingClientRect(),
    itemHeights: items.map(it => it.getBoundingClientRect().height),
    linkPointers: links.map(l => getComputedStyle(l).pointerEvents),
    bandPointers: bands.map(b => getComputedStyle(b).pointerEvents),
  };
});

console.log('Component layout state:', state);

// Let's physically move the mouse over each item and check what happens
const items = await page.$$('.flowing-menu__item');
for (let i = 0; i < items.length; i++) {
  const box = await items[i].boundingBox();
  console.log(`Hovering item ${i}...`);
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 5 });
  await new Promise(r => setTimeout(r, 200));

  const check = await page.evaluate((idx) => {
    const row = document.querySelectorAll('.flowing-menu__item')[idx];
    const band = row.querySelector('.flowing-menu__band');
    return {
      current: row.hasAttribute('data-current'),
      dimmed: row.hasAttribute('data-dimmed'),
      vis: band.style.visibility,
      clip: band.style.clipPath,
      trackStyle: band.querySelector('.flowing-menu__track')?.style.transform,
    };
  }, i);
  console.log(`Item ${i} check:`, check);
}

await page.screenshot({ path: 'd:\\RP portfolio rebuild\\rp-portfolio\\qa\\isolation-hover.png' });
console.log('Saved qa/isolation-hover.png');

await browser.close();
