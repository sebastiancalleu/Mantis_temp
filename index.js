const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
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

app.get("/api/name", function(req, res){
  res.json({
    question: "what is your name",
  })
})

app.post("/api/get", function(req, res){
  console.log(req.body)
  res.end()
})

app.get("/api/get", function(req, res){
  res.json({
    question: "what is your name",
  })
})