import puppeteer from 'puppeteer-core';

async function captureMobile() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  // iPhone 16 Pro Max viewport: 440 x 956
  await page.setViewport({ width: 440, height: 956, isMobile: true, hasTouch: true });

  await page.goto('http://localhost:5173/?intro=0', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  // Screenshot whole page or sections
  const sections = ['hero', 'about', 'card', 'work', 'learning', 'contact'];
  for (const sId of sections) {
    await page.evaluate((id) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'instant' });
    }, sId);
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: `d:\\RP portfolio rebuild\\rp-portfolio\\qa\\mobile-${sId}.png` });
    console.log(`Saved qa/mobile-${sId}.png`);
  }

  await browser.close();
}

captureMobile().catch(console.error);
