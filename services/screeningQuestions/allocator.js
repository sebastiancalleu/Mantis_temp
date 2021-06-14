const workableSQ = require('./workable').getJSON;
const greenhouseSQ = require('./greenhouse').getJSON;
const jobs_lever_coSQ = require('./jobs_lever_co').getJSON;
const breezySQ = require('./breezy').getJSON;
const applytojobSQ = require('./applytojob').getJSON;
const careers_pageSQ = require('./careers_page').getJSON;
const ashbyhqSQ = require('./ashbyhq').getJSON;
const smartrecruitersSQ = require('./smartrecruiters').getJSON;
const bambooSQ = require('./bamboohr').getJSON;
const jobviteSQ = require('./jobvite').getJSON;

let MyJSON;

function getSQ(urlx) {

  if (urlx.includes('workable.com')) {
    MyJSON = (workableSQ(urlx));
  } else if (urlx.includes('greenhouse.io')) {
    MyJSON =  (greenhouseSQ(urlx));
  } else if (urlx.includes('jobs.lever.co')) {
    MyJSON =  (jobs_lever_coSQ(urlx));
  } else if (urlx.includes('breezy.hr')) {
    MyJSON =  (breezySQ(urlx));
  } else if (urlx.includes('applytojob.com')) {
    MyJSON =  (applytojobSQ(urlx));
  } else if (urlx.includes('careers-page.com')) {
    MyJSON = (careers_pageSQ(urlx));
  } else if (urlx.includes('ashbyhq.com')) {
    MyJSON =  (ashbyhqSQ(urlx));
  } else if (urlx.includes('smartrecruiters.com')) {
    MyJSON =  (smartrecruitersSQ(urlx));
  } else if (urlx.includes('bamboohr.com')) {
    MyJSON =  (bambooSQ(urlx));
  } else if (urlx.includes('jobs.jobvite.com')) {
    MyJSON = (jobviteSQ(urlx))
  }
  console.log(urlx);
  return MyJSON;
};

exports.getSQ = getSQ;
