const express = require("express");
const router = express.Router();
const serviceProviderCtrl = require("../controllers/ServiceProviderController");
router.post("/signup", serviceProviderCtrl.signUp);
router.post("/login", serviceProviderCtrl.login);
router.get("/verify", serviceProviderCtrl.verify);
router.get("/logout", serviceProviderCtrl.logout);
// router.get("/profileData/:id", serviceProviderCtrl.getSPdata);
router.get("/:email", serviceProviderCtrl.getSPByEmail);
// router.put("/update/:id", serviceProviderCtrl.update);
router.patch("/updatePassword/:id", serviceProviderCtrl.updatePassword);
router.put("/updateFirstName/:id", serviceProviderCtrl.updateFirstName);
router.put("/updateLastName/:id", serviceProviderCtrl.updateLastName);
router.put("/updateFullName/:id", serviceProviderCtrl.updateFullName);
router.put("/updateEmail/:id", serviceProviderCtrl.updateEmail);
router.put("/updateAdress/:id", serviceProviderCtrl.updateAdress);
router.put("/updateImage/:id", serviceProviderCtrl.updateImage);

module.exports = router;
