const scrapForm = require('../getRawHTML/getHTML').scrapForm;
const cheerio = require('cheerio');
const Option = require('./torreQuestionClass').Option;
const Question = require('./torreQuestionClass').Question;

/**
 * Receives the container of a question and extract the information
 * 
 * @param {Cheerio Object} outerContainer 
 * @returns A Question object
 */

const scrapQuestions = (outerContainer) => {

  // These are the patterns of the page
  // **********************************

  const pattern1 = ($) => {
    let options = [], type;

    $('div > div > select > option').each((i, element) => {
      options.push(new Option($(element).text(), i));
    });

    if (options.length === 0) { type = 'open-write'; }
    else if (options.length === 2 && options[0].title === 'Yes') { type = 'yes-no'; }
    else { type = 'multiple-choice'; }

    return ({
      title: $('div > div.resumator-label').text(),
      type: type,
      options: options
    })

  };

  const pattern2 = ($) => {
    let options = [], type;

    $('select > option').each((i, element) => {
      if (i > 0) {
        options.push(new Option($(element).text(), i));
      }
    });

    if (options.length === 0) { type = 'open-write'; }
    else if (options.length === 2 && options[0].title === 'Yes') { type = 'yes-no'; }
    else { type = 'multiple-choice'; }

    return ({
      title: $('div > label').text(),
      type: type,
      options: options
    })

  };

  const pattern3 = ($) => {
    let options = [], type = 'open-write';

    return ({
      title: $('div.form-group > label').text(),
      type: type,
      options: options
    })

  };

  // ******************************************

  // **** Here Mantis identifies Patterns and executes the adecuate function

  let $ = cheerio.load(outerContainer);

  if ($('div > div > select').length) {
    return (pattern1($));
  } else if ('div.form-group > select') {
    return (pattern2($));
  } else if ($('div.form-group > label').length && $('div.form-group > input').length) {
    return (pattern3($));
  }

};

// ****
// 

async function getJSON(URL) {

  let rawHTML, $, $2, questions = [], options = [], i = 0;

  // **** Get the HTML of the FORM:
  try {
    rawHTML = await scrapForm(URL);
    $ = cheerio.load(rawHTML);
  } catch {
    return ({ error: 'Please provide a valid open position URL' });
  }

  // ****

  let generalContainers = [];

  // **** Make an array of the question containers:

  $('div.job-form-fields').each((i, element) => {
    $2 = cheerio.load(element);

    $2('div.job-form-fields > div.form-group').each((j, questionElement) => {
      if ($2('div > label').text() !== 'The following questions are entirely optional.' && $2('div.form-group').attr('id') !== 'resumator-address') {
        generalContainers.push(questionElement);
      }
    });
  });

  // ****

  let questionObject, k = 0;
  generalContainers.forEach((element, i) => {
    questionObject = scrapQuestions(element);
    if (questionObject && questionObject.title) {
      questions.push(new Question(questionObject, k));
      k++;
    }
  });

  console.log(questions);

};

exports.getJSON = getJSON;