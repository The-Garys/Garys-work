const express = require("express");
const app = express();
var cors = require("cors");
require("dotenv").config();
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRouter = require("./routes/UserRoute");
const serviceProviderRouter = require("./routes/ServiceProviderRouter");
const ServicesProviderListRouter = require("./routes/ServicesProviderListRoute")
const ContactUsRouter = require("./routes/ContactUsRoute");
const reviewRouter= require("./routes/ReviewRoute");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
const uri = process.env.URI ;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("successfully connected to database");
});

app.use("/api/user", userRouter);

app.use("/api/contactus", ContactUsRouter);

app.use("/api/serviceProvider", serviceProviderRouter);

app.use("/api/serviceProviderList", ServicesProviderListRouter);
app.use("/api/review", reviewRouter)


const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
