const User = require('../models/user.js');

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signup=async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash('success', 'Welcome to Nestigo!');
            res.redirect('/listings');
        });
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/signup');
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login=async (req, res) => {
    req.flash('success', 'Welcome to NESTINGO!');  
    const redirectUrl = res.locals.redirectUrl || '/listings';
    res.redirect(redirectUrl);
};

module.exports.renderForgotPasswordForm = (req, res) => {
    res.render("users/forgot-password.ejs");
};

module.exports.forgotPassword = async (req, res) => {
    try {
        const { username } = req.body;
        const user = await User.findOne({ username: username });
        
        if (!user) {
            req.flash('error', 'No account found with that username.');
            return res.redirect('/forgot-password');
        }
        
        // In a real application, you would:
        // 1. Generate a secure reset token
        // 2. Save it to the database with expiration
        // 3. Send email with reset link
        // 
        // For demo purposes, we'll show the user info directly
        res.render("users/reset-success.ejs", { 
            username: username,
            user: user 
        });
        
    } catch (err) {
        console.log(err);
        req.flash('error', 'Something went wrong. Please try again.');
        res.redirect('/forgot-password');
    }
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/listings');
    });
}