const scrapForm = require('../getRawHTML/getHTML').scrapForm;
const cheerio = require('cheerio');

async function getJSON(URL) {
  const fieldsArray = [];

  const formHTML = await scrapForm(URL)
  const $ = cheerio.load(formHTML);
  $('input').each((i, element) => {
    if (element.attribs.type != 'hidden' && element.attribs.required === '') {
      let aux = element.attribs.name;
      let aux2 = aux.replace("c", "")
      let tmpObj = {
        name: aux2,
        type: element.attribs.type
      }
      fieldsArray.push(tmpObj);
    }
  })
  // control de version generica
  // if (fieldsArray.length != 4) {
  //   fieldsArray.length = 0
  // } 
  return fieldsArray;
};

exports.getJSON = getJSON;