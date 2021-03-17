const express = require("express");
const app = express();
var cors = require("cors");
require("dotenv").config();
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRouter = require("./routes/UserRoute");
const serviceProviderRouter = require("./routes/ServiceProviderRouter");
const ServicesProviderListRouter = require("./routes/ServicesProviderListRoute");
const ContactUsRouter = require("./routes/ContactUsRoute");
const reviewRouter = require("./routes/ReviewRoute");
const appointmentRouter = require("./routes/AppointmentRoute");
const multer = require("multer");

const upload = multer({ dest: "uploads" });
const cloudinary = require("cloudinary").v2;
cloudinary.config({ 
  cloud_name: 'drtlodcal', 
  api_key: '923215134686589', 
  api_secret: 'U5zCH9A6UtR6gIksSTrNz3VWyP4' 
});
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

app.use("/api/user", userRouter);

app.use("/api/contactus", ContactUsRouter);

app.use("/api/serviceProvider", serviceProviderRouter);

app.use("/api/serviceProviderList", ServicesProviderListRouter);
app.use("/api/review", reviewRouter);
app.use("/api/appointment", appointmentRouter);


app.post("/upload", upload.any(0), (req, res) => {
  let image = req.files[0].path;
  console.log("REQ========> ", req.files[0].path);

  try {
    cloudinary.uploader.upload(image, (error, result) => {
      error && res.send({ status: false, msg: error });
      res.send({ status: true, msg: result });
    });
  } catch (err) {
    res.send({ status: false, msg: err });
  }
});
const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
