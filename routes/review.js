const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require('../schema.js');
const Listing = require('../models/listing.js');
const Review = require('../models/review.js');
const { isLoggedIn, isReviewOwner } = require('../middleware.js');

// Add validation middleware
const validateReview = async (req, res, next) => {
  try {
    await reviewSchema.validateAsync(req.body);
    next();
  } catch (error) {
    const errMsg = error.details.map(el => el.message).join(',');
    next(new ExpressError(400, errMsg));
  }
};

const reviewController = require('../controllers/reviews.js');
// Create review route
router.post('/', isLoggedIn, validateReview, wrapAsync(reviewController.createReview));


// Delete review route
router.delete('/:reviewId', isLoggedIn, isReviewOwner, wrapAsync(reviewController.deleteReview));

module.exports = router;