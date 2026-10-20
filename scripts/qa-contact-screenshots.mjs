import puppeteer from 'puppeteer-core';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to http://localhost:5173/#contact ...');
  await page.goto('http://localhost:5173/#contact', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));

  // Scroll to #contact
  await page.evaluate(() => {
    const contact = document.getElementById('contact');
    if (contact) contact.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));

  // Ensure dark theme first
  await page.evaluate(() => {
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
  });
  await new Promise(r => setTimeout(r, 400));

  // Find first flowing menu item
  const contactMenu = await page.$('#contact .flowing-menu');
  if (!contactMenu) {
    console.error('Could not find #contact .flowing-menu');
    await browser.close();
    return;
  }

  const items = await page.$$('#contact .flowing-menu__item');
  console.log(`Found ${items.length} items`);
  if (items.length > 0) {
    const box = await items[0].boundingBox();
    console.log('Hovering item 0 (Email) in dark mode:', box);
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 10 });
    // wait for glide and marquee animation
    await new Promise(r => setTimeout(r, 800));

    // Check band style
    const bandInfo = await page.evaluate(() => {
      const b = document.querySelector('#contact .flowing-menu__band');
      return {
        visibility: b?.style.visibility,
        clipPath: b?.style.clipPath,
        bg: getComputedStyle(b).backgroundColor,
        color: getComputedStyle(b).color,
      };
    });
    console.log('Dark band info:', bandInfo);

    const contactEl = await page.$('#contact');
    await contactEl.screenshot({ path: 'd:\\RP portfolio rebuild\\rp-portfolio\\qa\\contact-dark.png' });
    console.log('Saved qa/contact-dark.png');
  }

  // Switch to light theme
  console.log('Switching to light theme...');
  await page.evaluate(() => {
    // Click theme toggle button or set class
    const themeBtn = document.querySelector('button[aria-label*="theme" i], button[aria-label*="mode" i], button[title*="theme" i]');
    if (themeBtn) {
      themeBtn.click();
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  });
  await new Promise(r => setTimeout(r, 1000));

  // Hover item 1 (LinkedIn) or item 0 (Email) in light mode
  if (items.length > 1) {
    const box = await items[1].boundingBox();
    console.log('Hovering item 1 (LinkedIn) in light mode:', box);
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 10 });
    await new Promise(r => setTimeout(r, 800));

    const lightBandInfo = await page.evaluate(() => {
      const b = document.querySelector('#contact .flowing-menu__item[data-current] .flowing-menu__band');
      return {
        visibility: b?.style.visibility,
        clipPath: b?.style.clipPath,
        bg: b ? getComputedStyle(b).backgroundColor : null,
        color: b ? getComputedStyle(b).color : null,
      };
    });
    console.log('Light band info:', lightBandInfo);

    const contactEl = await page.$('#contact');
    await contactEl.screenshot({ path: 'd:\\RP portfolio rebuild\\rp-portfolio\\qa\\contact-light.png' });
    console.log('Saved qa/contact-light.png');
  }

  await browser.close();
}

run().catch(console.error);
