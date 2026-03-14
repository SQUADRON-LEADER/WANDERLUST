const Listing = require('../models/listing');
const Review = require('../models/review');
const ExpressError = require('../utils/ExpressError');

module.exports.createReview=async (req, res, next) => {
  let listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(new ExpressError(404, "Listing not found"));
  }
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  req.flash('success', 'Successfully created a new Review!');
  res.redirect(`/listings/${listing._id}`);
}

module.exports.deleteReview=async (req, res, next) => {
  let {id, reviewId} = req.params;
  let listing = await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
  if (!listing) {
    return next(new ExpressError(404, "Listing not found"));
  }
  await Review.findByIdAndDelete(reviewId);
  req.flash('success', 'Successfully deleted the review!');
  res.redirect(`/listings/${id}`);
}
