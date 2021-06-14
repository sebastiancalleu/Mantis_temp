const express = require('express');
const getSQ = require('../services/screeningQuestions/allocator').getSQ;
const router = express.Router();

/* GET home page. */
router.get('/api/multipleurl', function (req, res) {

  async function multipleURL(targets) {
    let array = [];
    let questions;
    for (url of targets) {
      questions = await getSQ(url);
      array.push({ [`${url}`]: questions });
    }
    return Promise.all(array).then((result) => {
      console.log(result);
      return result;
    });
  }

  const dct = multipleURL(req.body.urls)
  dct.then(function (result) {
    res.json(result);
  });
});

module.exports = router;