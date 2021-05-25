// This module has functions that performs the required actions for
// navigate to the screening questions.



class atsActions {
  constructor(prevTarget, coreTarget) {
    this.prevTarget = prevTarget;
    this.coreTarget = coreTarget;
  }
  prevActions() {
    if (this.prevTarget) {
      return `document.querySelector('${this.prevTarget}').click()`;
    } else {
      return () => { };
    }
  };

  coreAction() {
    return `document.querySelector('${this.coreTarget}').outerHTML`;
  };
}

const greenhouse = () => { return (new atsActions(null, 'form')) };
const workable = () => { return (new atsActions('[data-ui="application-form-tab"]', 'form')) };
const jobvite = () => { return (new atsActions('.jv-button-apply', 'form')) };
const lever = () => { return (new atsActions('.postings-btn', 'form')) };
const bamboo = () => { return (new atsActions('.fab-Button', 'form')) };
const breezy = () => { return (new atsActions('.apply', 'form')) };
const applytojob = () => { return (new atsActions(null, 'aside')) };
const careers = () => { return (new atsActions('.btn-lg', 'form')) };
const smartrecruiters = () => { return (new atsActions('#st-apply', 'oc-oneclick-form')) };

// Ahsbyhq has an issue with target selectors avoid use it for the moment
const ashbyhq = () => { return (new atsActions('.JobPosting_tab__2PW7p', '.JobPosting_section__m7PMk')) };
// comeet has a problem due to an Iframe avoid using 
const comeet = () => { return (new atsActions('#showApplyForm', '#jobFormWrapper')) };

const availableAts = [
  greenhouse,
  workable,
  jobvite,
  lever,
  bamboo,
  breezy,
  applytojob,
  ashbyhq,
  smartrecruiters,
  comeet,
  careers
];


const getActions = (URL) => {
  for (const element of availableAts) {
    if (URL.includes(element.name)) {
      return element();
    }
  }
};

exports.getActions = getActions;
