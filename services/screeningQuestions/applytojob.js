const scrapForm = require('../getRawHTML/getHTML').scrapForm;
const cheerio = require('cheerio');

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
      let count = 0
      $('.asterisk').each(() => {
        count++;
      })
      $('input').each((i, element) => {
        if (element.attribs.type != 'hidden') {
          let aux = element.attribs.name
          let aux2 = aux.replace("resumator-", "").replace("-value", "")
          let tmpObj = {
            name: aux2,
            type: element.attribs.type
          }
          fieldsArray.push(tmpObj)
        }
      })
    });
  return fieldsArray;
};

exports.getJSON = getJSON;