const express = require("express");
const router = express.Router();

const contactUsController = require("../controllers/ContactUsController");

router.post("/", contactUsController.AddMessage);

module.exports = router;
