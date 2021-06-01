
const getSpecialActions = (atsName) => {
  let actionsSet = {
    prevActions: null,
    coreActions: null
  }


  if (atsName == 'jobvite') {
    actionsSet.prevActions = [
      `document.querySelector('div.jv-job-detail-bottom-actions a.jv-button').click()`,
      `if (document.querySelector('#jv-country-select')) {
          document.querySelector('#jv-country-select').value = document.querySelectorAll('#jv-country-select option')[1].value;
          let e = document.createEvent('HTMLEvents');
          e.initEvent('change', false, true);
          document.querySelector('#jv-country-select').dispatchEvent(e);
          
        }`,
      `if (document.querySelector('#jv-country-select')) {
          document.querySelector('button[type]').click();
        }`
    ];

    actionsSet.coreActions = [
      `document.querySelector('form.ng-pristine').outerHTML`
    ]
  } else if (atsName == 'comeet') {

    actionsSet.prevActions = [
      `window.location.href = document.querySelector('iframe').src`
    ]

  }
  return actionsSet;
}


exports.getSpecialActions = getSpecialActions;
