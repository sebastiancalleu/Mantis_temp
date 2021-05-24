// This module has functions that performs the required actions for
// navigate to the screening questions.

function getPreviousActions(URL) {
  if (URL.includes('jobvite.com')) {
    return jobvitePreviousActions;
  } else if (URL.includes('lever.co')) {
    return leverPreviousActions;
  } else if (URL.includes('breezy.hr')) {
    return breezyPreviousActions;
  } else if (URL.includes('careers-page.com')) {
    return careerspagePreviousActions;
  } else if (URL.includes('smartrecruiters.com')) {
    return smartrecruitersPreviousActions;
  } else {
    return () => { };
  }

}

const jobvitePreviousActions = () => {
  document.querySelector('.jv-button-apply').click();
}

const leverPreviousActions = () => {
  document.querySelector('.postings-btn').click();
}

const breezyPreviousActions = () => {
  document.querySelector('.apply').click();
}

const careerspagePreviousActions = () => {
  document.querySelector('.btn-lg').click();
}

const smartrecruitersPreviousActions = () => {
  document.querySelector('#st-apply').click();
}


function getActions(URL) {

  if (URL.includes('greenhouse.io')) {
    return greenhouseActions;
  } else if (URL.includes('workable.com')) {
    return workableActions;
  } else if (URL.includes('jobvite.com')) {
    return jobviteActions;
  } else if (URL.includes('lever.co')) {
    return leverActions;
  } else if (URL.includes('bamboohr.com')) {
    return bambooActions;
  } else if (URL.includes('breezy.hr')) {
    return breezyActions;
  } else if (URL.includes('applytojob.com')) {
    return applytojobActions;
  } else if (URL.includes('careers-page.com')) {
    return careerspageActions;
  } else if (URL.includes('ashbyhq.com')) {
    return ashbyhqActions;
  } else if (URL.includes('smartrecruiters.com')) {
    return smartrecruitersActions;
  }
}

// for GreenHouse you need no actions
const greenhouseActions = () => {
  const rawHTML = document.querySelector('form').outerHTML;
  return rawHTML;
};

// for Workable you need to click an element but it doesn't take tinme to load
const workableActions = () => {
  document.querySelector('[data-ui="application-form-tab"]').click();
  const rawHTML = document.querySelector('form').outerHTML;
  return rawHTML;
};

// for JobVite you need to click an element and take desicions according with the result
const jobviteActions = () => {
  const rawHTML = document.querySelector('form').outerHTML;
  return rawHTML;
};

const leverActions = async () => {
  const rawHTML = document.querySelector('form').outerHTML;
  return rawHTML;
};

const bambooActions = () => {
  document.querySelector('.fab-Button').click();
  const rawHTML = document.querySelector('form').outerHTML;
  return rawHTML;
}

const breezyActions = () => {
  const rawHTML = document.querySelector('form').outerHTML;
  return rawHTML;
}

const applytojobActions = () => {
  const rawHTML = document.querySelector('#resumator-application-form').outerHTML;
  return rawHTML;
}

const careerspageActions = () => {
  const rawHTML = document.querySelector('form').outerHTML;
  return rawHTML;
}

const ashbyhqActions = () => {
  document.querySelectorAll('.JobPosting_tab__2PW7p')[1].click();
  const rawHTML = document.querySelector('.JobPosting_section__m7PMk').outerHTML;
  return rawHTML;
}

const smartrecruitersActions = () => {
  const rawHTML = document.querySelector('oc-oneclick-form').outerHTML;
  return rawHTML;
}

exports.getActions = getActions;
exports.getPreviousActions = getPreviousActions;
