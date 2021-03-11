const express = require("express");
const app = express();
var cors = require("cors");
var bodyParser = require("body-parser");

const port = 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.get("/", (req, res) => res.send("Hello World!"));

app.post("/halim", (req, res) => {
  res.send(req.body);
});

app.listen(port, () => console.log(`Example app listening on port port!`));
