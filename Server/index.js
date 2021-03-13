const express = require("express");
const app = express();
var cors = require("cors");
require("dotenv").config();
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRouter = require("./routes/UserRoute");
const serviceProviderRouter = require("./routes/ServiceProviderRouter");
const ServicesProviderListRouter = require("./routes/ServicesProviderListRoute")

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
const uri = process.env.URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("successfully connected to database");
});
// app.get("/", (req, res) => res.send("Hello World!"));
// app.use(express.json());

app.use("/api/user", userRouter);

app.use("/api/serviceProvider", serviceProviderRouter);
app.use("/api/serviceProviderList", ServicesProviderListRouter)

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
