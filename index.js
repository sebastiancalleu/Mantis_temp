const express = require("express");
const getSQ = require('./screeningQuestions/allocator').getSQ;
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

app.get("/api/status", function(req, res){
  res.json({
    status: "OK",
  })
})

app.post("/api/inputurl", function(req, res){
  async function urljson() {
      const mantisita = await getSQ(req.body.url)
      return mantisita
}
  const dct = urljson()
  dct.then(function(result){
    console.log(result)
    res.json(result)
  })
//   if (req.body.url === "www.mantis.com") {
//     sq = [
//       {
//         "name": "Nombre",
//         "type": "input" 
//       },
//       {
//         "name": "Edad",
//         "type": "input" 
//       },
//       {
//         "name": "holbie",
//         "type": "input"
//       }
//     ]
//     res.json(sq)
//   } else {
//   res.json({
//     status: "OK",
//   })
// }
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