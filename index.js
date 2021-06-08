const express = require("express");
const bodyParse = require('body-parser');

// Main Routes
const singleURL = require('./routes/inputurl')
const multipleURL = require('./routes/multipleurl')

const app = express();

// Setting Up some middlewares
app.use(express.urlencoded({ extended: true }));
app.use(bodyParse.urlencoded({ extended: true }));
app.use(express.json());


// setting CORS header to allow the origin
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.listen(3000)

app.get("/api/status", function (req, res) {
  res.json({
    status: "OK",
  })
})

app.post("/api/inputurl", singleURL);
app.get("/api/multipleurl", multipleURL);

app.post("/api/get", function (req, res) {
  console.log(req.body)
  res.end()
})

