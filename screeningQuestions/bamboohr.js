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
      let aux = '';
      let tipo;  
      let opciones = [];
      let tmpObj = {}
      $('fieldset div div').each((i, element) => {
        try {
          aux = ($(element)['0'].children[0].children[0].data)
        } catch (error) {  
        }
        try {
          if ($(element)['0'].children[0].next.children[0].attribs.type == 'text') {
            tipo = 'text'
          } else if ($(element)['0'].children[0].next.children[0].children[1].name == 'select') {
            tipo = 'select' 
          }
        } catch (error) {     
        }
        try {
          if ($(element).children()[1].children[0].children[1].attribs.type == 'file') {
            tipo = 'file' // ($(element)['0'].children[0].next.children[0].children[1].attribs.type) //file
          }
        } catch (error) {
          tipo = 'text' //if no type selected then choose by default
        }
        if (aux !== '' && aux !== undefined && aux !== '–Select–' && !(JSON.stringify(fieldsArray).includes(aux)) && ($(element)['0'].children[0].name !== 'legend')) {
          tmpObj = {
            format: i,
            options: opciones,
            name: aux,
            type: tipo,
          };
          fieldsArray.push(tmpObj);
        }
      });
      $('legend').each((j, otherElement) => {
        aux = ($(otherElement)['0'].children[0].data)
        opciones = ['Yes', 'No']
        tipo = 'select'

        if (aux !== '' && aux !== undefined && aux !== '–Select–' && !(JSON.stringify(fieldsArray).includes(aux))) {
          tmpObj = {
            format: 'write',
            options: opciones,
            name: aux,
            type: tipo,
          };
          fieldsArray.push(tmpObj);
          opciones = []
        }
    });
  });
  return fieldsArray;
}
exports.getJSON = getJSON;