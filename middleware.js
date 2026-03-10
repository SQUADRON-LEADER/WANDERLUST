const Listing = require('./models/listing.js');
const ExpressError = require('./utils/ExpressError.js');
module.exports.isLoggedIn = (req, res, next) => {
    console.log(req.path,"..",req.originalUrl);
    if (!req.isAuthenticated()) {
        //redirect Url Save
        req.session.returnTo = req.originalUrl; // Save the original URL

        req.flash('error', 'You must be logged in first!');
        return res.redirect('/login');
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.redirectUrl = req.session.returnTo;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    if (!req.user || !req.user._id.equals(id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/users/${id}`);
    }
    next();
};

module.exports.isListingOwner = async (req, res, next) => {
    const { id } = req.params;
    
    try {
        const listing = await Listing.findById(id);
        if (!listing) {
            req.flash('error', 'Listing not found');
            return res.redirect('/listings');
        }
        
        if (!listing.owner || !listing.owner.equals(req.user._id)) {
            req.flash('error', 'You are not authorized to perform this action');
            return res.redirect(`/listings/${id}`);
        }
        
        next();
    } catch (err) {
        req.flash('error', 'Something went wrong');
        return res.redirect('/listings');
    }
};

module.exports.isReviewOwner = async (req, res, next) => {
    const { id, reviewId } = req.params;
    
    try {
        const Review = require('./models/review.js');
        const review = await Review.findById(reviewId);
        
        if (!review) {
            req.flash('error', 'Review not found');
            return res.redirect(`/listings/${id}`);
        }
        
        if (!review.author || !review.author.equals(req.user._id)) {
            req.flash('error', 'You are not authorized to perform this action on this review');
            return res.redirect(`/listings/${id}`);
        }
        
        next();
    } catch (err) {
        req.flash('error', 'Something went wrong');
        return res.redirect(`/listings/${id}`);
    }
};