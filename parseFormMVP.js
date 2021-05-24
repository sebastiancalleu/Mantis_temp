const scrapForm = require('./getHTML').scrapForm;
const cheerio = require('cheerio');

const URL_a = 'https://boards.greenhouse.io/twitch/jobs/5166466002';

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
          console.log(formHTML)
          console.log(element)
        });
      }

    });
  return fieldsArray;
}

(async (URL_b) => {
  const MyJSON = await getJSON(URL_b);
  console.log(MyJSON)
})(URL_a);

exports.getJSON = getJSON;