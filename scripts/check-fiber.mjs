import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

await page.goto('http://localhost:5173/__flowing-test', { waitUntil: 'networkidle0' });

// Let's hook into React internals or add a window function from FlowingMenu
const evaluated = await page.evaluate(async () => {
  const list = document.querySelector('.flowing-menu__list');
  const items = Array.from(document.querySelectorAll('.flowing-menu__item'));

  // Let's check the react fiber on list
  const key = Object.keys(list).find(k => k.startsWith('__reactFiber'));
  const fiber = list[key];
  
  return {
    hasFiber: !!fiber,
  };
});

console.log('Evaluated:', evaluated);
await browser.close();
