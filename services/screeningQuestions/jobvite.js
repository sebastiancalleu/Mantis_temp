const scrapForm = require('../getRawHTML/getHTML').scrapForm;
const cheerio = require('cheerio');

async function getJSON(URL) {
  const fieldsArray = [];

  const formHTML = await scrapForm(URL);

  const $ = cheerio.load(formHTML);
  $('input').each((i, element) => {
    console.log(element.attribs)
  });
  return fieldsArray;
};

exports.getJSON = getJSON;