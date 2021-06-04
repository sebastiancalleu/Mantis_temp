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
        if ($(element)['0'].children[0].parent.attribs.class !== 'placeholder noclick') {
          aux = $(element)['0'].children[0].data; 
            try {
              if ($(element).next()['0'].children[0].next.name  == 'textarea') {
                tipo = ('text');
              }
            } catch (error) {
            } 
            try {
              if ($(element).next()['0'].children[0].attribs.type == 'text') {
                tipo = ('text');     
              } else if ($(element).next()['0'].children[0].children[0].next.attribs.type == 'file') {
                  tipo = ($(element).next()['0'].children[0].children[0].next.attribs.type);
              } else {
                  tipo = ($(element).parent()['0'].children['1'].children[0].children[0].next.name);
              }  
            } catch (error) {
            }
            let tmpObj = {
              name: aux,
              type: tipo,
            };
            fieldsArray.push(tmpObj);
        }
      });
    });
    return fieldsArray;
};

exports.getJSON = getJSON;