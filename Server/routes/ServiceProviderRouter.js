const express = require("express");
const router = express.Router();
const serviceProviderCtrl = require("../controllers/ServiceProviderController");
router.post("/signup", serviceProviderCtrl.signUp);

module.exports = router;
