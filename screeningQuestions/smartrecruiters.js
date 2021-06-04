const scrapForm = require('../getHTML').scrapForm;
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
      $('input').each((i, element) => {
        if (element.attribs['aria-required'] == 'true') {
          let tmpObj = {
            name: element.attribs.formcontrolname,
            type: element.attribs.type
          }
          fieldsArray.push(tmpObj)
        }
      })
  });
return fieldsArray;
}

exports.getJSON = getJSON;