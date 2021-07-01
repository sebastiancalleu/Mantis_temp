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
    return ({
      title: $('label > div.application-label').text(),
      type: 'open-write',
      options: []
    })
  };

  const pattern2 = ($) => {
    let options = [], type;

    $('li').each((i, element) => {
      if (i > 0) {
        options.push(new Option($(element).text(), i - 1));
      }
    });

    if (options.length === 0) { type = 'open-write'; }
    else if (options.length === 2 && options[0].title === 'Yes') { type = 'yes-no'; }
    else { type = 'multiple-choice'; }

    return ({
      title: $('label > div.application-label').text(),
      type: type,
      options: options
    })
  };

  // ******************************************

  // **** Here Mantis identifies Patterns and executes the adecuate function

  let $ = cheerio.load(outerContainer);

  if ($('label > div.application-label').length) {
    if ($('div.application-field > input').length || $('div.application-field > textarea').length) {
      return (pattern1($))
    } else if ($('div.application-field > ul').length) {
      return (pattern2($))
    }
  }
};

// ****
// 

async function getJSON(URL) {

  let title, type, rawHTML, $, $2, $3, fields = [], questions = [], options = [], i = 0;

  // **** Get the HTML of the FORM:
  try {
    rawHTML = await scrapForm(URL);
    $ = cheerio.load(rawHTML);
  } catch {
    return ({ error: 'Please provide a valid open position URL' });
  }

  // ****

  let generalContainers = [];
  let additionalInfoSection = false;
  let containersToExclude = ['Submit your application', 'Links', 'U.S. Equal Employment Opportunity information'];

  // **** Make an array of the question containers:

  $('div.application-form').each((i, element) => {
    $2 = cheerio.load(element);
    if ($2('h4').text() == 'Additional information') {
      additionalInfoSection = {
        title: $2('textarea').attr('placeholder'),
        type: 'open-write',
        options: []
      }
    } else {
      if (!containersToExclude.includes($2('h4').text())) {
        $2('li').each((j, questionElement) => {
          generalContainers.push(questionElement);
        });
      }
    }
  });

  // ****

  let questionObject;
  generalContainers.forEach((element, i) => {
    questionObject = scrapQuestions(element);
    if (questionObject) {
      questions.push(new Question(questionObject, i));
    }
  });

  if (additionalInfoSection) {
    if (questions.length > 0) {
      questions.push(new Question(additionalInfoSection, questions[questions.length - 1].rank + 1));
    } else {
      questions.push(new Question(additionalInfoSection, 0));
    }
  }

  return (questions);
};

exports.getJSON = getJSON;