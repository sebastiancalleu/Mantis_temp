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

    $('fieldset > div.ChecklikeGroup_option__Q0chm > label').each((i, element) => {
      options.push(new Option($(element).text(), i));
    });

    if (options.length === 0) { type = 'open-write'; }
    else if (options.length === 2 && options[0].title === 'Yes') { type = 'yes-no'; }
    else { type = 'multiple-choice'; }

    return ({
      title: $('fieldset > label').text(),
      type: type,
      options: options
    })
  };

  const pattern2 = ($) => {
    let options = [], type = 'yes-no';

    $('div > div > button').each((i, element) => {
      options.push(new Option($(element).text(), i));
    });

    return ({
      title: $('div > label').text(),
      type: type,
      options: options
    })
  };

  const pattern3 = ($) => {
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


  if ($('fieldset > div.ChecklikeGroup_option__Q0chm').length) {
    return (pattern1($));
  } else if ($('div > div.YesNo_container__U3qn3 > button').length) {
    return (pattern2($));
  } else if ($('div > input').length || $('div > textarea').length) {
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

  // **** Make an array of the question containers:

  $('div.JobPosting_section__m7PMk').each((i, element) => {
    $2 = cheerio.load(element);
    $2('div.EditableFieldEntry_fieldEntry__2itX8').each((j, questionElement) => {
      generalContainers.push(questionElement);
    });
    $2('div.JobPosting_section__m7PMk > fieldset').each((j, questionElement) => {
      generalContainers.push(questionElement);
    });

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