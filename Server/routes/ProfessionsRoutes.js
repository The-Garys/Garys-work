const express = require('express');
const router = express.Router();
const professionsControllers = require("../controllers/professionsControllers")


router.post('/addProfession',professionsControllers.addProfession);
router.get('/getProfessions',professionsControllers.getProfessions);



module.exports = router;