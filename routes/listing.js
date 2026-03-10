const express = require('express'); // Fixed typo
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require('../schema.js');
const Listing = require('../models/listing.js');
const Review = require('../models/review.js');
const { isLoggedIn, isListingOwner } = require('../middleware.js'); 
const listingController = require('../controllers/listings.js');
const multer = require('multer');
const {storage} = require('../cloudConfig.js');
const cloudinary = require('../cloudConfig.js').cloudinary; 
const upload = multer({ storage }); 





// Add validation middleware
const validateListing = (req, res, next) => {
  // Skip validation if req.body.listing is undefined (file upload issue)
  if (!req.body.listing) {
    return next();
  }
  
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map(el => el.message).join(',');
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// Root route - INDEX and CREATE
router.route('/')
    .get(wrapAsync(listingController.index)) // INDEX ROUTE
    .post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing)); // CREATE ROUTE

// File upload test route (separate from main CREATE route)
router.post('/upload', upload.single('listing[image]'), (req, res) => {
    res.send(req.file);
});

// NEW ROUTE - Must come before /:id routes
router.get('/new', isLoggedIn, listingController.renderNewForm);

// Individual listing routes - SHOW, EDIT, UPDATE, DELETE
router.route('/:id')
    .get(wrapAsync(listingController.showListing)) // SHOW ROUTE
    .put(isLoggedIn, isListingOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing)) // UPDATE ROUTE
    .delete(isLoggedIn, isListingOwner, wrapAsync(listingController.deleteListing)); // DELETE ROUTE

// EDIT ROUTE - Render edit form
router.get('/:id/edit', isLoggedIn, isListingOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;