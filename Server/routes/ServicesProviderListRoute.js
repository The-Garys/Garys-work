const express = require('express');
const router = express.Router();
const ServiceProvidersCtrl = require("../controllers/ServicesProviderListController")

router.get('/services', ServiceProvidersCtrl.findAll);
router.post('/services', ServiceProvidersCtrl.addServices);



module.exports = router;