// This module has a function that retrieves the form's html of a given URL
// It uses puppeteer for wait for all the HTML to be complete generated

require('dotenv').config();
const puppeteer = require('puppeteer');
const getActions = require('./getActions').getActions;
// const ZYTE_TOKEN = process.env.ZYTE_TOK;

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
        '--no-zygote', '--single-process'
      ]
    });
    const page = await browser.newPage();

    await page.goto(URL, {
      waitUntil: 'networkidle0'
    });

    const atsActions = getActions(URL);

    // If the ats Object has previous Target some clicks are needed
    if (atsActions.prevTarget) {
      for (element of atsActions.prevActions()) {
        await page.evaluate(element);
        await waitUntilLoaded(page);
      }
    }

    let rawHTML;
    for (element of atsActions.coreActions()) {
      rawHTML += await page.evaluate(element);
      await waitUntilLoaded(page);
    }
    //console.log(rawHTML);

    browser.close();
    return rawHTML;

  } catch (err) {
    if (browser) {
      browser.close();
    }
    return 'Plase review the URL seems like it is not a valid open position';
  }

}

/**
 * This function waits until the page has not new response for 2 seconds
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

//scrapForm('https://everli.recruitee.com/o/customer-service-shift-supervisor');

exports.scrapForm = scrapForm
