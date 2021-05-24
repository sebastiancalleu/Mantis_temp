// This module has a function that retrieves the html of a given URL
// It uses puppeteer for wait for all the HTML to be complete generated

const puppeteer = require('puppeteer');
const getActions = require('./getActions').getActions;
const getPreviousActions = require('./getActions').getPreviousActions;


async function scrapForm(URL) {
  browser = await puppeteer.launch({
    args: ["--disabled-setupid-sandbox", '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--no-first-run',
      '--no-sandbox',
      '--no-zygote',
      '--single-process',
    ]
  });
  const page = await browser.newPage();

  await page.goto(URL, {
    waitUntil: 'networkidle0'
  });

  // Previousl actions refers to clicks needed before the form is fully rendered

  await page.evaluate(getPreviousActions(URL));


  // Posible solución: https://github.com/puppeteer/puppeteer/issues/5328
  await page.waitFor(5000);

  const rawHTML = await page.evaluate(getActions(URL));

  // for testing purposes
  // console.log(rawHTML);


  browser.close();
  return rawHTML;

}

// for testing pourposes
// scrapForm('https://aldingerco.bamboohr.com/jobs/view.php?id=48');


exports.scrapForm = scrapForm
