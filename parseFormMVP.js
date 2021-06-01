const scrapForm = require('./getHTML').scrapForm;
const cheerio = require('cheerio');

const URL_a = 'https://lumenvox.bamboohr.com/jobs/view.php?id=34';

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
          if (element.attribs.type != 'hidden' && element.attribs['data-ui'] != 'autofill-computer') {
            let tmpObj = {
              format: "write",
              options: [],
              
              name: (element.attribs.name || element.attribs['data-ui']),
              type: element.attribs.type
            }
            fieldsArray.push(tmpObj);
          }
        });
        // scrapper for greenhousepage working at 97% MISSING FILES - TYPE 
      } else if (URL.includes('greenhouse.io')) {
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
        // control de version generica
        // if (fieldsArray.length != 4) {
        //   fieldsArray.length = 0
        // } 
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
        // control de version generica
        // if (count != 6) {
        //   fieldsArray.length = 0
        //   count = 0
        // }
      } else if (URL.includes('careers-page.com')) {
        console.log()
        $('input').each((i, element) => {
          if (element.attribs.type != 'hidden') {
            let aux = $(element).parent().siblings().text()
            let aux2 = aux.replace(": *", "")
            if (element.attribs.type === 'checkbox') {
              aux2 = 'I agree to the terms and conditions & privacy policy'
            }
            let tmpObj = {
              name: aux2,
              type: element.attribs.type
            }
            fieldsArray.push(tmpObj)
          }
        })
      } else if (URL.includes('bamboohr.com')) {
        $('div label').each((i, element) => {
          let aux;
          let tipo;  
          if ($(element)['0'].children[0].parent.attribs.class !== 'placeholder noclick') {
            aux = (i, $(element)['0'].children[0].data); 
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
      } else if (URL.includes('ashbyhq.com')) {

      } else if (URL.includes('smartrecruiters.com')) {
        // este sitio queda en pausa debido a que se necesita dar click para seguir con el formulario
        $('input').each((i, element) => {
          if (element.attribs['aria-required'] == 'true') {
            let tmpObj = {
              name: element.attribs.formcontrolname,
              type: element.attribs.type
            }
            fieldsArray.push(tmpObj)
          }
        })
      } else if (URL.includes('comeet.com')) {
        
        $('input').each((i, element) => {
          if (element.attribs.type != 'hidden') {
            console.log(element.attribs)
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