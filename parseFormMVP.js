const scrapForm = require('./getHTML').scrapForm;
const cheerio = require('cheerio');

const URL_a = 'https://directscale.applytojob.com/apply/Dm16fmaRNu/Software-Development-Engineer-In-Test';

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
      } else if (URL.includes('breezy.hr')) {
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
        if (fieldsArray.length != 4) {
          fieldsArray.length = 0
        } 
      } else if (URL.includes('applytojob.com')) {
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
        if (count != 6) {
          fieldsArray.length = 0
          count = 0
        }
      }

    });
  return fieldsArray;
}

(async (URL_b) => {
  const MyJSON = await getJSON(URL_b);
  console.log(MyJSON)
})(URL_a);

exports.getJSON = getJSON;