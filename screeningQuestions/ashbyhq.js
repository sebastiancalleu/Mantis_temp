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
      $('div label').each((i, element) => {
        let aux;
        let tipo;
        try {
          if (! $(element)['0'].prev) {
            aux = $(element)['0'].children[0].data
          }
        } catch (error) {
        }
        try {
          if ($(element)['0'].next.attribs.type == 'text' || $(element)['0'].next.attribs.type == 'email'){
            tipo = 'text'
          } else if ($(element)['0'].next.children[0].attribs['type'] == 'file') {
            tipo = 'file'
          } else if ($(element)['0'].next.children[0].children[0].next.attribs['type'] == 'checkbox'){
            tipo = 'checkbox'
            aux = $(element)['0'].children[0].data                                          
          } else {
            tipo = 'select'
          }
        } catch (error) {
          try {
            if ($(element)['0'].next.children['0']){
              tipo = $(element)['0'].next.children['0'].name
            }
          } catch (error) {
            tipo = 'text'
          }              
        }
        try {
          if ( $(element)['0'].prev) {
            aux = $(element)['0'].children[0].data
            tipo = $(element)['0'].prev.children[0].next.attribs.type
          }
        } catch (error) {
        }
          let tmpObj = {
            name: aux,
            type: tipo,
          };
          if (aux !== undefined) {
            fieldsArray.push(tmpObj);
          }
      });
    return fieldsArray;
    });
};



exports.getJSON = getJSON;