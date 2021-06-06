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
        if (element.attribs.type != 'hidden' && element.attribs['data-ui'] != 'autofill-computer') {
          let aux = ''
          let aux2 = ''
          let options1 = []
          if (element.attribs['data-ui'] && element.attribs['data-ui'].includes("QA")) {
            aux = $(element).parent().parent().siblings().text()
            aux2 = element.attribs.type
          } else if (element.attribs.type === 'checkbox') {
            aux = $(element).parent().siblings().text()
            aux2 = element.attribs.type
          } else if (element.attribs.type === 'radio') {
            if ($(element).parent().siblings().text().includes('Y') || $(element).siblings().text().includes('Y') || $(element).parent().siblings().text().includes('y') || $(element).siblings().text().includes('y')) {
              aux = $(element).parent().parent().parent().siblings().text()
              aux2 = "yes/no"
              for (i of fieldsArray) {
                if (i.name === aux) {
                  aux = ""
                  aux2 = ""
                }
              }
            } else {
              let aux3 = $(element).parent().parent().parent().siblings().text()
              let flag = 0
              for (i of fieldsArray) {
                if (i.name === aux3) {
                  i.options.push($(element).parent().siblings().text())
                  flag = 1
                }
              }
              if (flag === 0) {
                aux = aux3
                aux2 = "Multiplechoice"
                options1.push($(element).parent().siblings().text())
              }
            }
          } else {
              if (element.attribs.name && element.attribs.name.includes("QA")) {
              aux = $(element).parent().siblings().text()
              aux2 = element.attribs.type
            } else {
            aux = element.attribs.name || element.attribs['data-ui']
            aux2 = element.attribs.type
            }
          }
          if (aux != '' && aux2 != '') {
            let tmpObj = {
              format: "write",
              options: options1,
              
              name: aux,
              type: aux2
            }
            fieldsArray.push(tmpObj);  
          }
        }
      })
       $('textarea').each((i, element) => {
         let aux = ""
         aux = $(element).parent().parent().siblings().text()
         if (element.attribs.name.includes("QA")) {
           aux = $(element).parent().parent().siblings().text()
          }
        let tmpObj1 = {
          name: aux,
          type: "textarea"
        }
        fieldsArray.push(tmpObj1);
      });
    });
    return fieldsArray;
};

exports.getJSON = getJSON;