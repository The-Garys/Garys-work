const express = require('express');
const router = express.Router();
const review = require('../controllers/ReviewController');

router.post('/addReview', review.addReview);


module.exports = router;