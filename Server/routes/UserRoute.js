const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/UserController');

router.post('/register', userCtrl.register);
router.get('/users', userCtrl.getAll)
router.post('/login', userCtrl.login);
router.get("/verify", userCtrl.verify)
router.get("/logout", userCtrl.logout)
router.get("/:id", userCtrl.getUserDataById);
router.put("/update/:id", userCtrl.update);
router.patch("/updatePassword/:id", userCtrl.updatePassword);
router.put("/updateUserImage/:id", userCtrl.updateUserImage);
// added




module.exports = router;