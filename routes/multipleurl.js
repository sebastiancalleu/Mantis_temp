const express = require('express');
const getSQ = require('../services/screeningQuestions/allocator').getSQ;
const router = express.Router();

/* GET home page. */
router.get('/api/multipleurl', function (req, res) {

  (async function multipleURL() {
    let array = [];
    let questions;
    for (url of req.body.urls) {
      questions = await getSQ(url);
      array.push(questions);
    }
    Promise.all(array).then((result) => {
      res.json(result);
    });
  })();
});

module.exports = router;
