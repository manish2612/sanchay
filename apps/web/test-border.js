const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  await page.waitForSelector('input[placeholder="Enter text..."]');
  const borderColor = await page.evaluate(() => {
    const el = document.querySelector('input[placeholder="Enter text..."]').parentElement;
    return window.getComputedStyle(el).borderColor;
  });
  console.log('COMPUTED BORDER COLOR:', borderColor);
  await browser.close();
})();
