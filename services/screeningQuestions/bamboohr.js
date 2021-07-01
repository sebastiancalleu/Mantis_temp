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

    $('div > div > label').each((i, element) => {
      options.push(new Option($(element).text(), i));
    });

    if (options.length === 0) { type = 'open-write'; }
    else if (options.length === 2 && options[0].title === 'Yes') { type = 'yes-no'; }
    else { type = 'multiple-choice'; }

    return ({
      title: $('legend').text(),
      type: type,
      options: options
    })

  };

  const pattern2 = ($) => {
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

  if ($('legend').length) {
    return (pattern1($));
  } else if ($('div > label').length) {
    return (pattern2($));
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
  let containersToExclude = [];

  // **** Make an array of the question containers:

  $('fieldset').each((i, element) => {
    $2 = cheerio.load(element);
    if (i > 0) {
      if ($2('fieldset > legend').length === 0) {
        $2('fieldset > div > div').each((j, questionElement) => {
          generalContainers.push(questionElement);
        });
      } else {
        $2('fieldset').each((j, questionElement) => {
          generalContainers.push(questionElement);
        });

      }
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

}

exports.getJSON = getJSON;