const scrapForm = require('../getRawHTML/getHTML').scrapForm;
const cheerio = require('cheerio');

async function getJSON(URL) {
  const fieldsArray = [];

  const formHTML = await scrapForm(URL);

  const $ = cheerio.load(formHTML);
  $('input').each((i, element) => {
    if (element.attribs.type != 'hidden') {
      let aux = $(element).parent().siblings().text()
      let aux2 = aux.replace(": *", "")
      if (element.attribs.type === 'checkbox') {
        aux2 = 'I agree to the terms and conditions & privacy policy'
      }
      let tmpObj = {
        name: aux2,
        type: element.attribs.type
      }
      fieldsArray.push(tmpObj)
    }
  });
  return fieldsArray;
};

exports.getJSON = getJSON;