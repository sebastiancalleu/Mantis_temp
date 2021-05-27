// This module has a function that retrieves the form's html of a given URL
// It uses puppeteer for wait for all the HTML to be complete generated

require('dotenv').config();
const puppeteer = require('puppeteer');
const getActions = require('./getActions').getActions;
const ZYTE_TOKEN = process.env.ZYTE_TOK;
console.log(ZYTE_TOKEN)
/**
 * This function resturns the raw HTML of Screening Questions form of available ATS
 * 
 * @param {String} URL: The url whose form's HTML is desired. 
 */

async function scrapForm(URL) {
  try {
    browser = await puppeteer.launch({
      ignoreHTTPSErrors: true,
      args: ["--disabled-setupid-sandbox", '--disable-gpu',
        '--disable-dev-shm-usage', '--disable-setuid-sandbox',
        '--no-first-run', '--no-sandbox',
        '--no-zygote', '--single-process',
        '--proxy-server=http://proxy.crawlera.com:8010'
      ]
    });
    const page = await browser.newPage();

    //await page.setExtraHTTPHeaders({
    //  'Proxy-Authorization': 'Basic ' + Buffer.from(`${ZYTE_TOKEN}`).toString('base64'),
    //});

    await page.goto(URL, {
      waitUntil: 'networkidle0'
    });

    const atsActions = getActions(URL);

    // If the ats Object has previous Target some clicks are needed
    if (atsActions.prevTarget) {
      await page.evaluate(atsActions.prevActions());
      await waitUntilLoaded(page);
    }

    const rawHTML = await page.evaluate(atsActions.coreAction());

    console.log(rawHTML);

    browser.close();
    // return rawHTML;

  } catch (err) {
    browser.close();
    console.log(err);
  }

}

/**
 * This function waits until the page has not response for 2 seconds
 * it is important because sometimes puppeteer don't wait for elements 
 * to be fully loaded after an action
 * 
 * @param {pupeteer-page} page: The page you want to wait until loaded. 
 */

async function waitUntilLoaded(page) {

  // About this solution (https://github.com/puppeteer/puppeteer/issues/5328)

  let lastResponse = Math.floor(new Date() / 1000)
  page.on("response", res => {
    lastResponse = Math.floor(new Date() / 1000)
  })
  await new Promise(async resolve => {
    let checkResponseInterval = await setInterval(() => {
      if (Math.floor(new Date() / 1000) - 2 >= lastResponse) {
        clearInterval(checkResponseInterval)
        resolve()
      }
    }, 1000)
  })

}

// for testing pourposes
scrapForm('https://boards.greenhouse.io/twitch/jobs/5224555002');


exports.scrapForm = scrapForm
