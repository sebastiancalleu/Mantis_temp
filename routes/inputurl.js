const express = require('express');
const getSQ = require('../services/screeningQuestions/allocator').getSQ;
const router = express.Router();

/* GET home page. */
router.post('/api/inputurl', function (req, res) {
  (async function singleURL() {
    const question = await getSQ(req.body.url)
    console.log(question);
    res.json(question);
  })();
});

module.exports = router;