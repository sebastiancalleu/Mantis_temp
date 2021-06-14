const scrapForm = require('../getRawHTML/getHTML').scrapForm;
const cheerio = require('cheerio');


async function getJSON(URL) {
  const fieldsArray = [];
  let counter = 0;

  const formHTML = await scrapForm(URL);
  const $ = cheerio.load(formHTML);

  $('div label').each((i, element) => {
    let aux;
    let tipo;
    let opciones = null;
    try {
      if (($(element).parent()['0'].name !== 'fieldset') && !($(element).prev()[0])) {
        aux = $(element)['0'].children[0].data // tener en cuenta los que no tienen label y son preguuntas
        if (($(element)['0'].next.children[0].name == 'p')) {
          aux = aux + '(' + $(element)['0'].next.children[0].children[0].data + ')'
        }
      }
    } catch (error) {
    }
    try {
      if ($(element)['0'].next.attribs.type == 'text' || $(element)['0'].next.attribs.type == 'email' || $(element)['0'].next.attribs.type == 'tel') {
        tipo = 'text' //incluir tel
      } else if ($(element)['0'].next.name == 'textarea') {
        tipo = 'text'
      } else if ($(element)['0'].next.children[0].attribs['type'] == 'file') {
        tipo = 'file'
      } else if ($(element)['0'].next.next.attribs.type == 'text') {
        tipo = 'text'
      }
    } catch (error) {
      try {
        if ($(element)['0'].next.children['0']) {
          tipo = $(element)['0'].next.children['0'].name
          if (tipo == 'button') {
            opciones = ['yes', 'no'];
          }
        }
      } catch (error) {
        tipo = 'text'
      }
    }
    if (aux !== undefined && tipo !== 'p') {
      counter++;
      let tmpObj = {
        title: aux,
        rank: counter,
        options: opciones,
        formateq: 'write',
        type: tipo,
        purporse: 'learn',
        locale: 'en',
      }
      fieldsArray.push(tmpObj);
      opciones = null;
    }

  });
  $('fieldset').each((j, secondElement) => {
    let aux;
    let tipo;
    let opciones = [];
    aux = $(secondElement)['0'].children[0].children[0].data

    try {
      const $2 = cheerio.load(secondElement);
      $2('div label').each((k, subElement) => {
        if ($2(subElement)['0'].prev.children[0].next.attribs.type == 'radio') {
          tipo = 'select'
          opciones.push($2(subElement)['0'].children[0].data)
        } else if ($$2(subElement)['0'].prev.children[0].next.attribs.type == 'checkbox') {
          tipo = 'checkbox'
          opciones.push($2(subElement)['0'].children[0].data)
        }
      })
    } catch (error) {
    }

    if (aux !== undefined && tipo !== 'p') {
      counter++;
      let tmpObj = {
        title: aux,
        rank: counter,
        options: opciones,
        formateq: 'wirte',
        type: tipo,
        purporse: 'learn',
        locale: 'en',
      }
      fieldsArray.push(tmpObj);
      opciones = null;
    }
  });
  return fieldsArray;
};

exports.getJSON = getJSON;