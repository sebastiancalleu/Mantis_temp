// This module has a function that retrieves the html of a given URL
// It uses puppeteer for wait for all the HTML to be complete generated

const puppeteer = require('puppeteer');
const getActions = require('./getActions').getActions;
const getPreviousActions = require('./getActions').getPreviousActions;


async function scrapForm(URL) {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();

  await page.goto(URL, {
    waitUntil: 'networkidle0'
  });

  // Previousl actions refers to clicks needed before the form is fully rendered

  await page.evaluate(getPreviousActions(URL));


  // Posible solución: https://github.com/puppeteer/puppeteer/issues/5328
  await page.waitFor(10000);

  const rawHTML = await page.evaluate(getActions(URL));

  // for testing purposes
  // console.log(rawHTML);

  return rawHTML;

  browser.close();
}

// for testing pourposes
// getHTML('https://jobs.smartrecruiters.com/Visa/743999746639954-software-developer-java');


exports.scrapForm = scrapForm
