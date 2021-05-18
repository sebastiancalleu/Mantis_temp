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

      $('input').each((i, element) => {

        if ($(element)['0'].attribs.type != 'hidden') {
          let aux = $(element).siblings('label').contents().first().text();
          if (aux[0] === '\n') {
            aux = aux.split('\n')[1].trim()
          }
          tmpObj = {
            name: aux,
            type: $(element)['0'].name
          };

          if (tmpObj.name !== '') {
            fieldsArray.push(tmpObj);
          }

        }
      });

    });
  return fieldsArray;
}

(async (URL_b) => {
  const MyJSON = await getJSON(URL_b);
  console.log(MyJSON)
})(URL_a);
