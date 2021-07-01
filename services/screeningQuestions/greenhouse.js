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

    $('select > option').each((i, element) => {
      if (i > 0) {
        options.push(new Option($(element).text(), i - 1));
      }
    });

    if (options.length === 0) { type = 'open-write'; }
    else if (options.length === 2 && options[0].title === 'Yes') { type = 'yes-no'; }
    else { type = 'multiple-choice'; }

    return ({
      title: $('div > label').text().split('\n')[0],
      type: type,
      options: options
    })

  };

  const pattern2 = ($) => {
    let options = [], type;

    $('div.field > label > label').each((i, element) => {
      options.push(new Option($(element).text(), i - 1));
    });

    return ({
      title: $('div.field > label').text().split('\n')[0],
      type: 'checkboxes',
      options: options
    })
  };

  const pattern3 = ($) => {
    return ({
      title: $('div.field > label').text().split('\n')[0],
      type: 'open-write',
      options: []
    })
  };

  const pattern4 = ($) => {
    let options = [], type;

    $('div.field > select > option').each((i, element) => {
      if (i > 0) {
        options.push(new Option($(element).text(), i - 1));
      }
    });

    if (options.length === 0) { type = 'open-write'; }
    else if (options.length === 2 && options[0].title === 'Yes') { type = 'yes-no'; }
    else { type = 'multiple-choice'; }

    return ({
      title: $('div > label').text().split('\n')[0],
      type: type,
      options: options
    })

  };

  // ******************************************

  // **** Here Mantis identifies Patterns and executes the adecuate function

  let $ = cheerio.load(outerContainer);

  if ($('div.field > label').length) {
    if ($('div.field > label > select').length) {
      return (pattern1($));
    } else if ($('div.field > label > label > input').length) {
      return (pattern2($));
    } else if ($('div.field > label > textarea').length || $('div.field > label > input').length || $('div.field > input').length) {
      return (pattern3($));
    } else if ($('div.field > select').length) {
      return (pattern4($));
    }
  }
};

// ****

async function getJSON(URL) {

  let rawHTML, $, $2, questions = [];

  // **** Get the HTML of the FORM:
  try {
    rawHTML = await scrapForm(URL);
    $ = cheerio.load(rawHTML);
  } catch {
    return ({ error: 'Please provide a valid open position URL' });
  }

  // ****

  let generalContainers = [];
  let containersToExclude = ['main_fields', 'eeoc_fields', 'demographic_questions', 'education_section'];

  // **** Make an array of the question containers:

  $('form > div').each((i, element) => {
    $2 = cheerio.load(element);
    if (!containersToExclude.includes($2(element).attr('id'))) {
      $2('div.field').each((j, questionElement) => {
        generalContainers.push(questionElement);
      });
    }
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

  return (questions);
};

exports.getJSON = getJSON;
