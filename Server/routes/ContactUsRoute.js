const express = require("express");
const router = express.Router();

const contactUsController = require("../controllers/ContactUsController");

router.post("/", contactUsController.AddMessage);
router.get("/", contactUsController.GetMessages);
router.delete("/:id", contactUsController.DeleteMessage);

module.exports = router;
