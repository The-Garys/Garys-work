const express = require('express');
const router = express.Router();
const userCtrl= require('../controllers/UserController');

router.post('/register', userCtrl.register);
router.get('/users', userCtrl.getAll)
router.post('/login', userCtrl.login);





module.exports = router;