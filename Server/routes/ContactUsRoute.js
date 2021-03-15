const express = require("express");
const router = express.Router();

const contactUsController = require("../controllers/ContactUsController");

router.post("/", contactUsController.AddMessage);
router.get("/", contactUsController.GetMessages);

module.exports = router;
