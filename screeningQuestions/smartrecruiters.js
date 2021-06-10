const scrapForm = require('../getHTML').scrapForm;
const cheerio = require('cheerio');

class Question {

  constructor(title, type, rank, options = null) {
    this.title = title;
    this.type = type;
    this.rank = rank;
    this.options = options;
    this.format = 'write';
    this.purpose = 'learn';
    this.locale = 'en';
  }
}

async function getJSON(URL) {
  // Get The rawHTML of the screening questions form
  const formHTML = await scrapForm(URL);
  const $ = cheerio.load(formHTML);

  // Scrap the form and build an auxiliar object

  rawSQ = []

  $('.form-label').each((i, element) => {
    auxObj = {};
    auxObj.title = $(element).text();
    auxObj.type = $(element).siblings()[0].name;
    auxObj.aux = $(element).siblings()[0].attribs['type'];

    rawSQ.push(auxObj);

  });

  // Using the auxiliar object build the torre final object

  questions = [];
  let i = 1;
  for (element of rawSQ) {
    questions.push(new Question(element.title, 'open-written', i));
    i++;
  }

  return (questions);
}

exports.getJSON = getJSON;