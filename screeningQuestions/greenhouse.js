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
      $('.field*').each((i, element) => { // select all the element with class field
          let aux; 
          let tipo;
          let opciones = [];
          let flag = 0;
          aux = element.children['0'].next.children[0].data.trim() //save the question name
          if (aux.length == 0 || aux == '(Select one)'){ // if no stored saved then try loooking this option
            aux = $(element)['0'].children[0].data.trim()
            const $2 = cheerio.load(element);
            $2('label').each((a, subelement) => {
              try {
                opciones.push($(subelement).children()['0'].next.data.trim())
                tipo = 'select'
                flag = 1;
              } catch (error) {
              }
            });
          } else { // if question was stored then add type and options
          try {
          if ($(element).children().children().find('input')['0'].attribs.type == 'checkbox'){
            tipo = 'select'
            const $2 = cheerio.load(element);
            $2('label').each((a, subelement) => {
                opciones.push(subelement.children[2].data)
            });
            flag = 1;
          } 
        }catch (error) {
          }
          if (flag == 0){ // if the type is not select then try to looking other options
            try {
                if ($(element).find('select').text().length !== 0){
                  tipo = 'select'
                  opciones = $(element).find('select').text().split('\n')
                } else if ($(element).find('input')['0'].attribs.type === 'hidden' || $(element).find('input')['0'].attribs.type ==='text') {
                  tipo = 'text'
                }
            } catch(error) {
              console.log('error')
            }  
          }
          if (tipo == undefined){ // if type not selected then asssign  type = file 
            tipo = 'file'
          }
        }
          tmpObj = {
            format: "write",
            options: opciones,
            name: aux,
            type: tipo,
          };
          fieldsArray.push(tmpObj);
        })
    });
    return fieldsArray;
};

exports.getJSON = getJSON;
