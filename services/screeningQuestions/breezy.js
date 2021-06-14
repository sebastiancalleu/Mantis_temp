const scrapForm = require('../getRawHTML/getHTML').scrapForm;
const cheerio = require('cheerio');

const URL_a = 'https://chatfuel.breezy.hr/p/1174e7ce8f7001-marketing-copywriter';

async function PlainHTML(URL_d) {
  try {
    const desiredHTML = await scrapForm(URL_d);
    return desiredHTML;
  } catch (error) {
    return (error);
  }
};

async function getJSON(URL) {
  const fieldsArray = [];

  await PlainHTML(URL)
    .then((formHTML) => {
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
    });
  return fieldsArray;
};

exports.getJSON = getJSON;