import puppeteer from 'puppeteer-core';

async function testBounds() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const widths = [1920, 1440, 960];
  const results = {};

  for (const w of widths) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: 1000 });
    await page.goto('http://localhost:5173/#learning', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));

    // Scroll to #learning
    await page.evaluate(() => {
      document.getElementById('learning')?.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise(r => setTimeout(r, 600));

    // Find folder card
    const folderParent = await page.$('#learning .lg\\:col-span-6');
    if (folderParent) {
      const box = await folderParent.boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 5 });
      }
    }
    await new Promise(r => setTimeout(r, 700));

    // Measure bounding boxes
    const overlapInfo = await page.evaluate(() => {
      const folderCard = document.querySelector('#learning .lg\\:col-span-6:first-child');
      const listCol = document.querySelector('#learning .lg\\:col-span-6.relative.z-\\[2\\]') ||
                       document.querySelector('#learning .lg\\:col-span-6:nth-child(2)');
      const listRows = Array.from(document.querySelectorAll('#learning button[aria-expanded]'));

      if (!folderCard || !listCol) {
        return { error: 'folderCard or listCol not found' };
      }

      const folderRect = folderCard.getBoundingClientRect();
      const listRect = listCol.getBoundingClientRect();
      const rowRects = listRows.map(r => r.getBoundingClientRect());

      // If stacked on mobile/narrow screens (960px might be stacked or side-by-side depending on breakpoint: lg is 1024px)
      // If stacked: folderRect is above listRect (vertical separation)
      // If side-by-side: horizontal gap = listRect.left - folderRect.right
      const isSideBySide = listRect.top < folderRect.bottom - 50;
      const horizontalGap = isSideBySide ? (listRect.left - folderRect.right) : (folderRect.width);
      const verticalGap = isSideBySide ? null : (listRect.top - folderRect.bottom);

      const intersectsAnyRow = rowRects.some(r => {
        return !(folderRect.right < r.left ||
                 folderRect.left > r.right ||
                 folderRect.bottom < r.top ||
                 folderRect.top > r.bottom);
      });

      return {
        isSideBySide,
        folderRect: { left: Math.round(folderRect.left), right: Math.round(folderRect.right), width: Math.round(folderRect.width) },
        listRect: { left: Math.round(listRect.left), right: Math.round(listRect.right), width: Math.round(listRect.width) },
        horizontalGap: isSideBySide ? Math.round(horizontalGap) : 'N/A (stacked)',
        verticalGap: !isSideBySide ? Math.round(verticalGap) : 'N/A (side-by-side)',
        intersectsAnyRow
      };
    });

    results[w] = overlapInfo;
    console.log(`Width ${w}px result:`, overlapInfo);
    await page.close();
  }

  await browser.close();
  return results;
}

testBounds().catch(console.error);
