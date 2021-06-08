const express = require('express');
const getSQ = require('../screeningQuestions/allocator').getSQ;
const router = express.Router();

/* GET home page. */
router.post('/api/inputurl', function (req, res) {
  async function singleURL(target) {
    const questions = await getSQ(target)
    return questions
  }
  const dct = singleURL(req.body.url)
  dct.then(function (result) {
    console.log(result)
    res.json(result)
  })
});

module.exports = router;