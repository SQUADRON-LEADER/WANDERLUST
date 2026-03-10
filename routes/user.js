const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const passport = require('passport');
const wrapAsync = require('../utils/wrapAsync.js');
const { saveRedirectUrl } = require('../middleware.js');
const userController = require('../controllers/users.js');

// Home route - redirect to listings
router.get("/", (req, res) => {
    res.redirect('/listings');
});

// Signup routes
router.route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signup));

// Login routes
router.route("/login")
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl, passport.authenticate("local", {
        failureRedirect: '/login',
        failureFlash: true
    }), userController.login);

// Forgot Password routes
router.route("/forgot-password")
    .get(userController.renderForgotPasswordForm)
    .post(wrapAsync(userController.forgotPassword));

// Logout route
router.get("/logout", userController.logout);   

module.exports = router;
