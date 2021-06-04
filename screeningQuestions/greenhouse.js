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
      // scrapper for greenhousepage working at 97% MISSING FILES - TYPE
      $('.field').each((i, element) => {
        let aux;
        let tipo;
        aux = element.children['0'].next.children[0].data.trim()
        try {
            if ($(element).find('select').text().length !== 0){
              tipo = 'select' + $(element).find('select').text()
            } else if ($(element).find('input')['0'].attribs.type === 'hidden' || $(element).find('input')['0'].attribs.type ==='text') {
              tipo = 'text'
            } else {
              tipo = 'file'
            }
        } catch(error) {
          console.log('error')
        }   
        tmpObj = {
          name: aux,
          type: tipo,
        };
        fieldsArray.push(tmpObj);
      });
    });
    return fieldsArray;
};

exports.getJSON = getJSON;
