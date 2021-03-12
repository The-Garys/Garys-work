const router = require("express").Router();
const controller = require("../controllers/SP-sign-controller.js");
router.post("/halim", controller.signUp);
module.exports = router;
