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

async function getSQ(URL) {
  if (URL.includes('workable.com')) {
    MyJSON = await workableSQ(URL);
  } else if (URL.includes('greenhouse.io')) {
    MyJSON = await greenhouseSQ(URL);
  } else if (URL.includes('jobs.lever.co')) {
    MyJSON = await jobs_lever_coSQ(URL);
  } else if (URL.includes('breezy.hr')) {
    MyJSON = await breezySQ(URL);
  } else if (URL.includes('applytojob.com')) {
    MyJSON = await applytojobSQ(URL);
  } else if (URL.includes('careers-page.com')) {
    MyJSON = await careers_pageSQ(URL);
  } else if (URL.includes('ashbyhq.com')) {
    MyJSON = await ashbyhqSQ(URL);
  } else if (URL.includes('smartrecruiters.com')) {
    MyJSON = await smartrecruitersSQ(URL);
  } else if (URL.includes('bamboohr.com')) {
    MyJSON = await bambooSQ(URL);
  } else if (URL.includes('jobs.jobvite.com')) {
    MyJSON = await jobviteSQ(URL);
  }
  console.log(URL);
  return {
    url: URL,
    questions: MyJSON
  };
};

exports.getSQ = getSQ;
