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

    $('span.radio > label').each((i, element) => {
      options.push(new Option($(element).text(), i));
    });
    $('span.checkbox > label').each((i, element) => {
      options.push(new Option($(element).text(), i));
    });

    if (options.length === 0) { type = 'open-write'; }
    else if (options.length === 2 && options[0].title === 'Yes') { type = 'yes-no'; }
    else { type = 'checkboxes' }


    return ({
      title: $('div > div > label').text(),
      type: type,
      options: options
    })
  };

  const pattern2 = ($) => {
    return ({
      title: $('div > label').text(),
      type: 'open-write',
      options: []
    })
  };

  const pattern3 = ($) => {
    return ({
      title: $('div > div > label').text(),
      type: 'open-write',
      options: []
    })
  };

  // ******************************************

  // **** Here Mantis identifies Patterns and executes the adecuate function

  let $ = cheerio.load(outerContainer);


  if ($('div > div > span.radio').length || $('div > div > span.checkbox').length) {
    return (pattern1($));
  } else if ($('div.form-group > input').length) {
    return (pattern2($));
  } else if ($('div > div > textarea').length) {
    return (pattern3($));
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
  let containersToExclude = [];


  // **** Make an array of the question containers:

  $('section').each((i, element) => {
    $2 = cheerio.load(element);
    if (!containersToExclude.includes($2('section > div > h3').text())) {
      $2('section > div.col-md-7 > div').each((j, questionElement) => {
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