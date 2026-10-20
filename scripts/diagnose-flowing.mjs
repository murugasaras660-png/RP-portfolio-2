import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

const result = await page.evaluate(() => {
  const list = document.querySelector('.flowing-menu__list');
  const items = Array.from(document.querySelectorAll('.flowing-menu__item'));
  const rect = list.getBoundingClientRect();
  
  // Test pointer event manually on list
  const testY = rect.top + 50;
  const testX = rect.left + 200;

  const event = new PointerEvent('pointermove', {
    clientX: testX,
    clientY: testY,
    pointerType: 'mouse',
    bubbles: true
  });
  
  list.dispatchEvent(event);

  return {
    rect: { top: rect.top, height: rect.height },
    itemsOffset: items.map(it => ({ top: it.offsetTop, height: it.offsetHeight })),
  };
});

console.log('Result:', result);

// Wait 400ms for RAF animation to run
await new Promise(r => setTimeout(r, 400));

const bandAfter = await page.evaluate(() => {
  const bands = Array.from(document.querySelectorAll('.flowing-menu__band'));
  return bands.map((b, i) => ({
    i,
    vis: b.style.visibility,
    compVis: getComputedStyle(b).visibility,
    clip: b.style.clipPath,
    compClip: getComputedStyle(b).clipPath,
  }));
});

console.log('Bands after pointermove:', bandAfter);

await browser.close();
