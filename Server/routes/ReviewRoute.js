const express = require('express');
const router = express.Router();
const review = require('../controllers/ReviewController');

router.post('/addReview', review.addReview);
router.get('/allReviews', review.allReviews)
router.get("/oneReview", review.oneReview)

module.exports = router;