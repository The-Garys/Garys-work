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
const adminRouter = require("./routes/AdminRoutes");
const professionsRouter = require("./routes/ProfessionsRoutes");
const postsRouter = require("./routes/PostsRoute");
const multer = require("multer");

const upload = multer({ dest: "uploads" });
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
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

app.use("/api/admin", adminRouter);
app.use("/api/professions", professionsRouter);
app.use("/api/posts", postsRouter);

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

// const twilio = require("twilio");

// const client = new twilio(
//   "AC265a6bb67a6ac795d9909c2a7d415e90",
//   "512f56e02aa5bd087f8d2295ffe0b597"
// );

// app.get("/twilio", async (req, res) => {
//   try {
//     await client.messages.create({
//       to: "+21622556110",
//       from: "+15178363113",
//       body: "Hello from Twilio!",
//     });
//     res.send("hello?");
//   } catch (err) {
//     console.log(err);
//   }
// });

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
