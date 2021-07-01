const scrapForm = require('../getRawHTML/getHTML').scrapForm;
const cheerio = require('cheerio');

(async function getJSON(URL) {

  let rawHTML, $, fields = [], questions = [], i = 0;

  try {
    rawHTML = await scrapForm(URL);
    $ = cheerio.load(rawHTML);
  } catch {
    return ({ error: 'Please provide a valid open position URL' });
  }

  console.log(rawHTML);
})("https://www.upeducationnetwork.org/careers/?p=job/okg2efwA&nl=1");

//exports.getJSON = getJSON;