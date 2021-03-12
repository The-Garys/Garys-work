const express = require("express");
const app = express();
var cors = require("cors");

var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRouter = require("./routes/UserRoute");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
const uri = process.env.URI || 3000;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("successfully connected to database");
});
// app.get("/", (req, res) => res.send("Hello World!"));
// app.use(express.json());

app.use("/api", userRouter);

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
