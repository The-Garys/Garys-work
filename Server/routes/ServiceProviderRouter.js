const express = require("express");
const router = express.Router();
const serviceProviderCtrl = require("../controllers/ServiceProviderController");
router.post("/signup", serviceProviderCtrl.signUp);
router.post("/login", serviceProviderCtrl.login);
router.get("/verify", serviceProviderCtrl.verify);
router.get("/logout", serviceProviderCtrl.logout);
// router.get("/profileData/:id", serviceProviderCtrl.getSPdata);
router.get("/:email", serviceProviderCtrl.getSPByEmail);
router.put("/update/:id", serviceProviderCtrl.update);
router.patch("/updatePassword/:id", serviceProviderCtrl.updatePassword);

module.exports = router;
