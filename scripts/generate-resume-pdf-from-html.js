#!/usr/bin/env node

const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox']});
  const page = await browser.newPage();
  await page.goto('file://' + process.cwd() + '/resume.html', {waitUntil: 'networkidle0'});
  await page.pdf({path: 'resume.pdf', format: 'A4'});
  await browser.close();
})();
