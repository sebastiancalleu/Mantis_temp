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

    $('div > div > div > label > span').each((i, element) => {
      options.push(new Option($(element).text(), i));
    });

    if (options.length === 0) { type = 'open-write'; }
    else if (options.length === 2 && options[0].title === 'Yes') { type = 'yes-no'; }
    else { type = 'checkboxes'; }

    return ({
      title: $('div > div > span > span > strong').text(),
      type: type,
      options: options
    })

  };

  const pattern2 = ($) => {
    let options = [], type;

    return ({
      title: $('div > label > span > span > strong').text(),
      type: 'open-write',
      options: options
    })
  };

  // ******************************************

  // **** Here Mantis identifies Patterns and executes the adecuate function

  let $ = cheerio.load(outerContainer);


  if ($('div > div > div._-_-shared-ui-molecules-group-___styles__vertical').length) {
    return (pattern1($));
  } else if ($('div > label > div > div > input').length || $('div > label > div > div > textarea').length) {
    return (pattern2($));
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
  let containersToExclude = ['Personal information'];

  // **** Make an array of the question containers:

  $('section').each((i, element) => {
    $2 = cheerio.load(element);
    if (!containersToExclude.includes($2('div.job-form-section-styles__header--2oDxC > h2').text())) {
      $2('div > div.job-form-section-styles__field--3ok0-').each((j, questionElement) => {
        generalContainers.push(questionElement);
      });
    }
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