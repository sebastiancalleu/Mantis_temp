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
          if (element.attribs['data-ui'] && element.attribs['data-ui'].includes("QA")) {
            console.log("wtf")
            aux = $(element).parent().siblings().text()
            aux2 = element.attribs.type
          } else if (element.attribs.type === 'checkbox') {
            aux = $(element).parent().siblings().text()
            aux2 = element.attribs.type
          } else if (element.attribs.type === 'radio') {
            if ($(element).parent().siblings().text().includes('Y')) {
              aux = $(element).parent().parent().parent().siblings().text()
              aux2 = "yes/no"
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
              options: [],
              
              name: aux,
              type: aux2
            }
            fieldsArray.push(tmpObj);  
          }
        }
      })
       $('textarea').each((i, element) => {
         let aux = ""
         if (element.attribs.name.includes("QA")) {
           let str1 = "#" + element.attribs['aria-labelledby']
           aux = $(element).parent().parent().siblings().children(str1).text()
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