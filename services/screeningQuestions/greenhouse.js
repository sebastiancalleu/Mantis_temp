const scrapForm = require('../getRawHTML/getHTML').scrapForm;
const cheerio = require('cheerio');
const Option = require('./torreQuestionClass').Option;
const Question = require('./torreQuestionClass').Question;

function scrapGreenHouse($, targetTag) {

  let title, type, options = [], tagFields = [], $2;

  $(targetTag).each((i, element) => {

    $2 = cheerio.load(element);
    if ($2('select').length > 0) {
      $2('select > option').each((j, option_element) => {
        if (j > 0) { options.push(new Option($2(option_element).text(), j - 1)); }
      })
    }

    if (options.length === 0) { type = 'open-write'; }
    else if (options.length === 2 && options[0].title === 'Yes') { type = 'yes-no'; }
    else { type = 'multiple-choice'; }

    title = $(element).text().split('\n')[0];
    tagFields.push({ title, options, type });
  });

  return (tagFields);
}

async function getJSON(URL) {

  let rawHTML, $, fields = [], questions = [], i = 0;
  try {
    rawHTML = await scrapForm(URL);
    $ = cheerio.load(rawHTML);
  } catch {
    return ({ error: 'Please provide a valid open position URL' });
  }

  fields = fields.concat(scrapGreenHouse($, '#custom_fields > .field > label'));
  fields = fields.concat(scrapGreenHouse($, '#eeoc_fields > div'));

  for (element of fields) {
    questions.push(new Question(element.title, element.type, i, element.options));
    i++;
  }
  return (questions);

}

exports.getJSON = getJSON;
