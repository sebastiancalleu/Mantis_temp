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
      return `document.querySelector('${this.prevTarget}').click()`;
    } else {
      return () => { };
    }
  };

  coreAction() {
    return `document.querySelector('${this.coreTarget}').outerHTML`;
  }
}

const greenhouse = () => { return (new atsActions(null, 'form')) };
const workable = () => { return (new atsActions('[data-ui="application-form-tab"]', 'form')) };
const jobvite = () => { return (new atsActions('.jv-button-apply', 'form')) };
const lever = () => { return (new atsActions('.postings-btn', 'form')) };
const bamboo = () => { return (new atsActions('.fab-Button', 'form')) };
const breezy = () => { return (new atsActions('.apply', 'form')) };
const applytojob = () => { return (new atsActions(null, '#resumator-application-form')) };
const careerspage = () => { return (new atsActions('.btn-lg', 'form')) };
const ashbyhq = () => { return (new atsActions('.JobPosting_tab__2PW7p', '.JobPosting_section__m7PMk')) };
const smartrecruiters = () => { return (new atsActions('#st-apply', 'oc-oneclick-form')) };

const availableAts = [
  greenhouse,
  workable,
  jobvite,
  lever,
  bamboo,
  breezy,
  applytojob,
  careerspage,
  ashbyhq,
  smartrecruiters
];


const getActions = (URL) => {
  for (const element of availableAts) {
    if (URL.includes(element.name)) {
      return element();
    }
  }
};

exports.getActions = getActions;
