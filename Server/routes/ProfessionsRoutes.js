const express = require('express');
const router = express.Router();
const professionsControllers = require("../controllers/professionsControllers")


router.post('/addProfession',professionsControllers.addProfession);
router.get('/getProfessions',professionsControllers.getProfessions);
router.put('/updateImage/:id',professionsControllers.updateImg)
router.put('/updateService/:id',professionsControllers.updateService)



module.exports = router;