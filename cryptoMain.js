const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const axios = require('axios');
const pageScrollObj = require('./pageScroll');
const fetchCoinPriceObj = require('./fetchCoinPrice');

const site = "https://www.coinmarketcap.com/";

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto(site);
    await page.setViewport({
        width: 1200,
        height: 800
    });

    await pageScrollObj.pgScroll(page);

    await fetchCoinPriceObj.cryptoCoinInfo(site);

    await page.screenshot({
        path: 'CryptoCoins.png',
        fullPage: true
    });

    await browser.close();
})();