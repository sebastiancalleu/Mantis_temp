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
    let options = [], type = 'open-write';

    return ({
      title: $('div > label').text(),
      type: type,
      options: options
    })
  };

  // ******************************************

  // **** Here Mantis identifies Patterns and executes the adecuate function

  let $ = cheerio.load(outerContainer);


  if ($('div.flex-grow > input.element--input').length || $('div.form-control > textarea').length) {
    return (pattern1($));
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
  let containersToExclude = ['Personal information', 'Experience', 'Education', 'On the web', 'Resume'];


  // **** Make an array of the question containers:

  $('div.form-section').each((i, element) => {
    $2 = cheerio.load(element);
    if (!containersToExclude.includes($2('h3').text())) {
      $2('div.flex-grow').each((j, questionElement) => {
        generalContainers.push(questionElement);
      });
      $2('div.form-control').each((j, questionElement) => {
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
