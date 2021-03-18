const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/AdminControllers");

router.post("/login", adminControllers.verifyLogin);

module.exports = router;
