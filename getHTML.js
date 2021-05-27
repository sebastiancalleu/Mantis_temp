// This module has a function that retrieves the html of a given URL
// It uses puppeteer for wait for all the HTML to be complete generated

const puppeteer = require('puppeteer');
const getActions = require('./getActions').getActions;

/**
 * This function resturns the raw HTML of Screening Questions form of available ATS
 * 
 * @param {String} URL: The url whose form's HTML is desired. 
 */

async function scrapForm(URL) {
  browser = await puppeteer.launch({
    args: ["--disabled-setupid-sandbox", '--disable-gpu',
      '--disable-dev-shm-usage', '--disable-setuid-sandbox',
      '--no-first-run', '--no-sandbox',
      '--no-zygote', '--single-process',
    ]
  });
  const page = await browser.newPage();

  await page.goto(URL, {
    waitUntil: 'networkidle0'
  });

  const atsActions = getActions(URL);

  // If the ats Object has previous Target some clicks are needed
  if (atsActions.prevTarget) {
    await page.evaluate(atsActions.prevActions());
    await waitUntil(page);
  }

  const rawHTML = await page.evaluate(atsActions.coreAction());

  console.log(rawHTML);



  // Posible solución: 


  browser.close();
  // return rawHTML;

}

/**
 * This function waits until the page has not response for 2 seconds
 * it is important because sometimes puppeteer don't wait for elements 
 * to be fully loaded after an action
 * 
 * @param {pupeteer-page} page: The page you want to wait until loaded. 
 */

async function waitUntil(page) {

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
scrapForm('https://jobs.lever.co/landing/73727237-99cb-4967-9a03-0a793e2747e1');


exports.scrapForm = scrapForm
