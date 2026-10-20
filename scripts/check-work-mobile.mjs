import puppeteer from 'puppeteer-core';

async function check() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 440, height: 956, isMobile: true, hasTouch: true });

  const consoleLogs = [];
  page.on('console', msg => consoleLogs.push(msg.text()));
  page.on('pageerror', err => consoleLogs.push('PAGE_ERROR: ' + err.message));

  await page.goto('http://localhost:5173/?intro=0', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  await page.evaluate(() => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));

  await page.screenshot({ path: 'd:\\RP portfolio rebuild\\rp-portfolio\\qa\\mobile-work-current.png' });
  console.log('Saved qa/mobile-work-current.png');
  console.log('Console logs:', consoleLogs);

  // Check if Grid (G) exists anywhere
  const hasGridBtn = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button')).some(b => b.textContent?.includes('Grid (G)'));
  });
  console.log('Has Grid (G) button:', hasGridBtn);

  await browser.close();
}

check().catch(console.error);
