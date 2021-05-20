const puppeteer = require('puppeteer');
let page, browser

//scrapForm RETORNA CONTENIDO EN FORMATO HTML o TXT !!!!!!!!!

const scrapForm = async (url) => {
  /* crea una instancia nueva de chronium */
  browser = await puppeteer.launch({ args: ["--disabled-setupid-sandbox", '--disable-gpu',
  '--disable-dev-shm-usage',
  '--disable-setuid-sandbox',
  '--no-first-run',
  '--no-sandbox',
  '--no-zygote',
  '--single-process',
] });
  /* se abre una pagina nueva */
  page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
  /* va a la pagina y espera a que se cargue todo */
  await page.goto(url);
  /* Busca los campos solicitados y los retorna depenmdiendo del argumento pasado en la linea de codigo*/
  const preguntas = await page.$eval('form', contenido => contenido.outerHTML)
  await browser.close();
  return preguntas
};

exports.scrapForm = scrapForm
