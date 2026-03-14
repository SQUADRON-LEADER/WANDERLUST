if(process.env.NODE_ENV != "production") {
  require('dotenv').config();
}

// Suppress deprecation warnings from dependencies
process.noDeprecation = true;


const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const path = require('path');
const methodOverride = require('method-override');
const MONGODB_URL = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";
const ejsMate = require('ejs-mate');
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require('./schema.js');
const Review = require('./models/review.js');
const listingRouter = require('./routes/listing.js');
const reviewRouter = require('./routes/review.js');
const userRouter = require('./routes/user.js');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user.js');

if (process.env.NODE_ENV === 'production') {
  // Required on hosts like Render/Heroku so secure cookies work behind reverse proxies.
  app.set('trust proxy', 1);
}

// Connect to MongoDB first
mongoose.connect(MONGODB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, '/public')));

//session setup - using mongoUrl instead of client
const sessionOptions = {
  secret: process.env.SECRET || "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  proxy: process.env.NODE_ENV === 'production',
  store: MongoStore.create({
    mongoUrl: MONGODB_URL,
    touchAfter: 24 * 3600, // Lazy session update (in seconds)
  }),
  cookie:{
    maxAge: 1000 * 60 * 60 * 24 * 7, 
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
  },
};


app.use(session(sessionOptions));
app.use(flash()); 
app.use(passport.initialize());

app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.currUser = req.user;
  res.locals.error = req.flash('error');
  next();
});

app.get('/health', (req, res) => {
  res.status(200).json({ ok: true });
});



// Mount listings routes
app.use('/listings', listingRouter);

// Mount reviews routes - Fixed typo "reviewws" to "reviews"
app.use('/listings/:id/reviews', reviewRouter);

app.use('/', userRouter);

// 404 handler
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// Error handler
app.use((err, req, res, next) => {
  // If headers are already sent, delegate to default Express error handler
  if (res.headersSent) {
    return next(err);
  }
  
  let {statusCode = 500, message = "something went wrong"} = err;
  res.status(statusCode).render("error.ejs", {message});
});

// Start server only if not in serverless environment (Vercel)
if (process.env.VERCEL !== '1') {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export for Vercel serverless
module.exports = app;