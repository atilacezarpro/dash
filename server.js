const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/capture', async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle0' });
    await page.setViewport({ width: 1280, height: 720 });
    await page.screenshot({ path: path.join(__dirname, 'public', 'screenshot.png') });
    await browser.close();
    res.send('Screenshot taken and saved');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error taking screenshot');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});