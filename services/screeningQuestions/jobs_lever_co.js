const scrapForm = require('../getRawHTML/getHTML').scrapForm;
const cheerio = require('cheerio');

async function getJSON(URL) {
  const fieldsArray = [];

  const formHTML = await scrapForm(URL)

  const $ = cheerio.load(formHTML);
  $('input').each((i, element) => {
    if (element.attribs.type != 'hidden') {
      let aux;
      if (element.attribs.type === 'checkbox') {
        aux = 'Acepto y estoy de acuerdo con la Declaración de Candidatos y Candidatas (cornershopapp.com/candidates-privacy)'
      } else if (element.attribs.name === 'org') {
        aux = 'Current company'
      } else {
        aux = element.attribs.name
      }
      let tmpObj = {
        name: aux,
        type: element.attribs.type
      }
      fieldsArray.push(tmpObj);
    }
  });
  $('textarea').each((i, element) => {
    if (element.attribs.required) {

      let tmpObj1 = {
        name: '¿Cuál es tu expectativa salarial para esta posición?',
        type: 'textarea'
      }
      fieldsArray.push(tmpObj1);
    }
  });
  return fieldsArray;
};

exports.getJSON = getJSON;