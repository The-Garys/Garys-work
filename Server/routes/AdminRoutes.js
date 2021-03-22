const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/AdminControllers");

router.post("/seed", adminControllers.post);
router.post("/login", adminControllers.verifyLogin);
router.put("/:id", adminControllers.ban);

module.exports = router;
