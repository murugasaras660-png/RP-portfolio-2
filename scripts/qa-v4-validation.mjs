import puppeteer from 'puppeteer-core';

async function runAudit() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const widths = [1920, 1440, 960, 440, 390, 360];
  const auditResults = {
    viewports: {},
    intro: {},
    themeSwitchPerf: {},
  };

  // 1. Intro Sequence Test
  console.log('\n--- 1. Testing Opening / Intro Sequence ---');
  const introPage = await browser.newPage();
  await introPage.setViewport({ width: 1440, height: 900 });

  // Clear sessionStorage before test
  await introPage.goto('http://localhost:5173/?test=' + Date.now());
  await introPage.evaluate(() => sessionStorage.clear());
  
  // Reload to see preloader sequence
  await introPage.goto('http://localhost:5173/');
  
  // Wait 300ms: check preloader presence & status
  await new Promise(r => setTimeout(r, 400));
  const duringIntro = await introPage.evaluate(() => {
    const root = document.getElementById('root');
    const status = document.querySelector('[role="status"]');
    const rChar = document.body.innerText.includes('R') && document.body.innerText.includes('P');
    return {
      ariaBusy: root?.getAttribute('aria-busy'),
      statusText: status?.textContent?.trim(),
      hasMonogram: rChar,
    };
  });
  console.log('During intro state:', duringIntro);
  auditResults.intro.duringIntro = duringIntro;

  // Wait 3 seconds for intro sequence to complete
  await new Promise(r => setTimeout(r, 3200));
  const afterIntro = await introPage.evaluate(() => {
    const root = document.getElementById('root');
    const seen = sessionStorage.getItem('rp-intro-seen');
    const preloaderExists = document.querySelector('[role="status"]') !== null;
    return {
      ariaBusy: root?.getAttribute('aria-busy'),
      seen,
      preloaderUnmounted: !preloaderExists,
    };
  });
  console.log('After intro state:', afterIntro);
  auditResults.intro.afterIntro = afterIntro;
  await introPage.close();

  // 2. Viewport Checks in both themes
  console.log('\n--- 2. Testing Viewports & Responsiveness ---');
  for (const w of widths) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: 900 });
    // Skip intro using query param ?intro=0 for fast testing
    await page.goto('http://localhost:5173/?intro=0', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 800));

    for (const theme of ['dark', 'light']) {
      await page.evaluate((t) => {
        if (t === 'dark') {
          document.documentElement.classList.add('dark');
          document.documentElement.classList.remove('light');
        } else {
          document.documentElement.classList.add('light');
          document.documentElement.classList.remove('dark');
        }
      }, theme);
      await new Promise(r => setTimeout(r, 300));

      const vInfo = await page.evaluate((width) => {
        // Check horizontal overflow
        const hasHorizontalScroll = document.documentElement.scrollWidth > window.innerWidth;
        const scrollWidth = document.documentElement.scrollWidth;

        // Check Brand occurrences in navbar
        const header = document.querySelector('header');
        const brandsInHeader = header ? Array.from(header.querySelectorAll('*')).filter(el => {
          return el.children.length === 0 && (el.textContent?.trim() === 'RP' || el.textContent?.trim() === 'RP.');
        }).map(el => el.textContent?.trim()) : [];

        // Check "Open to work" vs "Open to internship"
        const pageText = document.body.innerText;
        const hasOpenToWork = pageText.includes('Open to work');
        const hasOpenToInternship = pageText.includes('Open to internship');

        // Check section scroll margin top
        const sections = Array.from(document.querySelectorAll('section[id]'));
        const scrollMargins = sections.map(s => ({
          id: s.id,
          scrollMarginTop: getComputedStyle(s).scrollMarginTop
        }));

        return {
          width,
          scrollWidth,
          hasHorizontalScroll,
          brandsInHeader,
          hasOpenToWork,
          hasOpenToInternship,
          scrollMarginsOk: scrollMargins.every(s => s.scrollMarginTop === '88px')
        };
      }, w);

      auditResults.viewports[`${w}px_${theme}`] = vInfo;
      console.log(`[${w}px - ${theme}] Overflow: ${vInfo.hasHorizontalScroll ? 'FAIL' : 'PASS'}, Brands in Header: ${vInfo.brandsInHeader.length} (${vInfo.brandsInHeader.join(', ')}), Open to internship: ${vInfo.hasOpenToInternship}, Open to work: ${vInfo.hasOpenToWork}`);
    }
    await page.close();
  }

  // 3. Theme Switch Performance with 4x CPU Throttling
  console.log('\n--- 3. Testing Theme Switch Performance (4x CPU Throttling) ---');
  const perfPage = await browser.newPage();
  await perfPage.setViewport({ width: 1440, height: 900 });
  await perfPage.goto('http://localhost:5173/?intro=0', { waitUntil: 'networkidle0' });

  // Emulate 4x CPU throttling via CDP
  const client = await perfPage.createCDPSession();
  await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });

  // Scroll to middle of page where cards and WebGL exist
  await perfPage.evaluate(() => window.scrollTo(0, 1200));
  await new Promise(r => setTimeout(r, 600));

  // Measure theme toggle execution time
  const switchTime = await perfPage.evaluate(async () => {
    const btn = document.querySelector('button[aria-label*="theme" i], button[aria-label*="mode" i], button[title*="theme" i]');
    if (!btn) return { error: 'Toggle button not found' };

    const t0 = performance.now();
    btn.click();

    // Measure time until theme-switching class finishes or next RAF
    await new Promise(resolve => {
      const check = () => {
        if (!document.documentElement.classList.contains('theme-switching')) {
          resolve();
        } else {
          requestAnimationFrame(check);
        }
      };
      // fallback timeout 1s
      setTimeout(resolve, 800);
      requestAnimationFrame(check);
    });

    const duration = performance.now() - t0;
    return { duration: Math.round(duration) };
  });

  console.log('Theme switch with 4x CPU throttling:', switchTime);
  auditResults.themeSwitchPerf = switchTime;

  await browser.close();
  return auditResults;
}

runAudit().then(res => {
  console.log('\nAudit complete! Writing audit-summary.json ...');
}).catch(console.error);
