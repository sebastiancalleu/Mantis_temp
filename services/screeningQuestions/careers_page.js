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

    $('div > div > ul > li > label').each((i, element) => {
      options.push(new Option($(element).text(), i));
    });

    if (options.length === 0) { type = 'open-write'; }
    else if (options.length === 2 && options[0].title === 'Yes') { type = 'yes-no'; }
    else { type = 'checkboxes'; }

    return ({
      title: $('div.form-group > label').text(),
      type: type,
      options: options
    })
  };

  const pattern2 = ($) => {
    let options = [], type;

    $('div > div > select > option').each((i, element) => {
      options.push(new Option($(element).text(), i));
    });

    if (options.length === 0) { type = 'open-write'; }
    else if (options.length === 2 && options[0].title === 'Yes') { type = 'yes-no'; }
    else { type = 'multiple-choice'; }

    return ({
      title: $('div.form-group > label').text(),
      type: type,
      options: options
    })
  };

  const pattern3 = ($) => {
    let options = [], type;

    return ({
      title: $('div.form-group > label').text(),
      type: 'open-write',
      options: options
    })
  };

  // ******************************************

  // **** Here Mantis identifies Patterns and executes the adecuate function

  let $ = cheerio.load(outerContainer);


  if ($('div > div > ul').length) {
    return (pattern1($));
  } else if ($('div > div > select').length) {
    return (pattern2($));
  } else if ($('div > div > textarea').length || $('div > div > input').length) {
    return (pattern3($));
  }
};

// ****

async function getJSON(URL) {

  let rawHTML, $, questions = [];

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

  $('div.form-group').each((i, element) => {
    generalContainers.push(element);
  });

  // ****

  let questionObject, k = 0;
  generalContainers.forEach((element, i) => {
    questionObject = scrapQuestions(element);
    if (questionObject) {
      questions.push(new Question(questionObject, k));
      k++;
    }
  });

  return (questions);
};

exports.getJSON = getJSON;
