const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/AdminControllers");

router.post("/seed", adminControllers.post);
router.post("/login", adminControllers.verifyLogin);
router.put("/:id", adminControllers.banUser);
router.put("/sp/:id", adminControllers.banSp);

module.exports = router;
