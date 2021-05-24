// This module has functions that performs the required actions for
// navigate to the screening questions.


// class definition
class atsActions {
  constructor(prevTarget, coreTarget) {
    this.prevTarget = prevTarget;
    this.coreTarget = coreTarget;
  }

  prevActions() {
    if (this.prevTarget) {
      return () => {
        document.querySelector(this.prevTarget).click();
      };
    } else {
      return () => { };
    }
  };

  coreAction() {
    return () => {
      const rawHTML = document.querySelector(this.coreTarget).outerHTML;
      return rawHTML;
    }
  }
}

const Greenhouse = () => { new atsActions(null, 'form') };
const Workable = () => { new atsActions('[data-ui="application-form-tab"]', 'form') };
const Jobvite = () => { new atsActions('.jv-button-apply', 'form') };
const Lever = () => { new atsActions('.postings-btn', 'form') };
const Bamboo = () => { new atsActions('.fab-Button', 'form') };
const Breezy = () => { new atsActions('.apply', 'form') };
const Applytojob = () => { new atsActions(null, '#resumator-application-form') };
const Careerspage = () => { new atsActions('.btn-lg', 'form') };
const Ashbyhq = () => { new atsActions('.JobPosting_tab__2PW7p', '.JobPosting_section__m7PMk') };
const Smartrecruiters = () => { new atsActions('#st-apply', 'oc-oneclick-form') };

const availableAts = [
  Greenhouse,
  Workable,
  Jobvite,
  Lever,
  Bamboo,
  Breezy,
  Applytojob,
  Careerspage,
  Ashbyhq,
  Smartrecruiters
];



//function getPreviousActions(URL) {
//  if (URL.includes('jobvite.com')) {
//    return jobvitePreviousActions;
//  } else if (URL.includes('lever.co')) {
//    return leverPreviousActions;
//  } else if (URL.includes('breezy.hr')) {
//    return breezyPreviousActions;
//  } else if (URL.includes('careers-page.com')) {
//    return careerspagePreviousActions;
//} else if (URL.includes('smartrecruiters.com')) {
//  return smartrecruitersPreviousActions;
//} else {
//  return () => { };
//}
//
//}

//const jobvitePreviousActions = () => {
//  document.querySelector('.jv-button-apply').click();
//}

//const leverPreviousActions = () => {
//  document.querySelector('.postings-btn').click();
//}

// const breezyPreviousActions = () => {
//   document.querySelector('.apply').click();
// }

// const careerspagePreviousActions = () => {
//   document.querySelector('.btn-lg').click();
// }

//const smartrecruitersPreviousActions = () => {
//  document.querySelector('#st-apply').click();
//}


//function getActions(URL) {

//  if (URL.includes('greenhouse.io')) {
//    return greenhouseActions;
//  } else if (URL.includes('workable.com')) {
//    return workableActions;
//} else if (URL.includes('jobvite.com')) {
//  return jobviteActions;
//} else if (URL.includes('lever.co')) {
//  return leverActions;
//} else if (URL.includes('bamboohr.com')) {
//   return bambooActions;
// } else if (URL.includes('breezy.hr')) {
//   return breezyActions;
// } else if (URL.includes('applytojob.com')) {
//   return applytojobActions;
// } else if (URL.includes('careers-page.com')) {
//   return careerspageActions;
//} else if (URL.includes('ashbyhq.com')) {
//  return ashbyhqActions;
//} else if (URL.includes('smartrecruiters.com')) {
//  return smartrecruitersActions;
//}
//}

// for GreenHouse you need no actions
// const greenhouseActions = () => {
//  const rawHTML = document.querySelector('form').outerHTML;
//  return rawHTML;
// };

// for Workable you need to click an element but it doesn't take tinme to load
//const workableActions = () => {
//  document.querySelector('[data-ui="application-form-tab"]').click();
//  const rawHTML = document.querySelector('form').outerHTML;
//  return rawHTML;
//};

// for JobVite you need to click an element and take desicions according with the result
//const jobviteActions = () => {
//  const rawHTML = document.querySelector('form').outerHTML;
//  return rawHTML;
//};

// const leverActions = async () => {
//   const rawHTML = document.querySelector('form').outerHTML;
//   return rawHTML;
// };

// const bambooActions = () => {
//   document.querySelector('.fab-Button').click();
//   const rawHTML = document.querySelector('form').outerHTML;
//   return rawHTML;
// }

// const breezyActions = () => {
//   const rawHTML = document.querySelector('form').outerHTML;
//   return rawHTML;
// }
// 
// const applytojobActions = () => {
//   const rawHTML = document.querySelector('#resumator-application-form').outerHTML;
//   return rawHTML;
// }

// const careerspageActions = () => {
//   const rawHTML = document.querySelector('form').outerHTML;
//   return rawHTML;
// }

// const ashbyhqActions = () => {
//   document.querySelectorAll('.JobPosting_tab__2PW7p')[1].click();
//   const rawHTML = document.querySelector('.JobPosting_section__m7PMk').outerHTML;
//   return rawHTML;
// }

// const smartrecruitersActions = () => {
//   const rawHTML = document.querySelector('oc-oneclick-form').outerHTML;
//   return rawHTML;
// }

exports.getActions = getActions;
exports.getPreviousActions = getPreviousActions;
