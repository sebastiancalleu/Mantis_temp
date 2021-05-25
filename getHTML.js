// This module has a function that retrieves the html of a given URL
// It uses puppeteer for wait for all the HTML to be complete generated

const puppeteer = require('puppeteer');
const getActions = require('./getActions').getActions;
const getPreviousActions = require('./getActions').getPreviousActions;


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

  const rawHTML = await page.evaluate(atsActions.coreAction());

  console.log(rawHTML);



  // Posible solución: 


  browser.close();
  // return rawHTML;

}

// for testing pourposes
scrapForm('https://linio.applytojob.com/apply/lZObkYJzpf/COLOMBIA-Practicante-rea-Marketing');


exports.scrapForm = scrapForm
