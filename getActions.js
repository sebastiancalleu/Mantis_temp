// This module has functions that performs the required actions for
// navigate to the screening questions.

const getSpecialActions = require('./getSpecialActions').getSpecialActions;

class atsActions {
  constructor(prevTarget, coreTarget, specialActionsSet) {
    this.prevTarget = prevTarget;
    this.coreTarget = coreTarget;
    this.specialActions = getSpecialActions(specialActionsSet);
  }

  prevActions() {
    if (this.specialActions.prevActions) {
      return this.specialActions.prevActions;
    } else if (this.prevTarget) {
      return [`document.querySelector('${this.prevTarget}').click()`];
    } else {
      return () => { };
    }
  }

  coreActions() {
    if (this.specialActions.coreActions) {
      return this.specialActions.coreActions;
    } else if (this.coreTarget) {
      return [`document.querySelector('${this.coreTarget}').outerHTML`];
    } else {
      return () => { };
    }
  }

}

const greenhouse = () => { return (new atsActions(null, 'form', null)) };
const workable = () => { return (new atsActions('[data-ui="application-form-tab"]', 'form', null)) };
const jobvite = () => { return (new atsActions('.jv-button-apply', 'form', 'jobvite')) };
const lever = () => { return (new atsActions('.postings-btn', 'form', null)) };
const bamboo = () => { return (new atsActions('.fab-Button', 'form', null)) };
const breezy = () => { return (new atsActions('.apply', 'form', null)) };
const applytojob = () => { return (new atsActions(null, '#job-application-form-container', null)) };
const careers = () => { return (new atsActions('.btn-lg', 'form', null)) };
const smartrecruiters = () => { return (new atsActions('#st-apply', 'oc-oneclick-form', null)) };
const ashbyhq = () => { return (new atsActions('.Button_primary__I_9I9', '.JobPosting_section__m7PMk', null)) };
const comeet = () => { return (new atsActions('#showApplyForm', '.form-container', 'comeet')) };
const cvwarehouse = () => { return (new atsActions('a.important', '#signUp', null)) };
const recruitee = () => { return (new atsActions('a.btn-thebiggest', '#new_candidate', null)) };


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
  cvwarehouse,
  recruitee,
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
