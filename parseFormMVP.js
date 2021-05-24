const scrapForm = require('./getHTML').scrapForm;
const cheerio = require('cheerio');

const URL_a = 'https://jobs.lever.co/cornershopapp/5c67c51d-b71b-4859-abd1-e8847472839a';

async function PlainHTML(URL_d) {
  try {
    const desiredHTML = await scrapForm(URL_d);
    return desiredHTML;
  } catch (error) {
    return (error);
  }

};

// name: label.text
// type: input

async function getJSON(URL) {
  const fieldsArray = [];

  await PlainHTML(URL)
    .then((formHTML) => {
      const $ = cheerio.load(formHTML);
      if (URL.includes('workable.com')) {
        $('input').each((i, element) => {
          if (element.attribs.type != 'hidden') {
            let tmpObj = {
              name: (element.attribs.name || element.attribs['data-ui']),
              type: element.attribs.type
            }
            fieldsArray.push(tmpObj);
          }
        });  
      } else if (URL.includes('greenhouse.io')) {
        $('h1').each((i, element) => {

          let aux = $(element).text();
          tmpObj = {
            name: aux,
            type: "title"
          };
            fieldsArray.push(tmpObj);
        });
        $('.asterisk').each((i, element) => {
          let aux = $(element)['0'].prev.data.trim();
          let tipo;
          if ($(element).siblings('select').text().length !== 0){
            tipo = 'select' + "\n" + $(element).siblings('select').text()
          } else {
            tipo = 'text'
          }
          tmpObj = {
            name: aux,
            type: tipo,
          };
          if (tmpObj.name != '') {
            fieldsArray.push(tmpObj);
          }
        });
      } else if (URL.includes('jobs.lever.co')) {
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
        })
      }

    });
  return fieldsArray;
}

(async (URL_b) => {
  const MyJSON = await getJSON(URL_b);
  console.log(MyJSON)
})(URL_a);

exports.getJSON = getJSON;