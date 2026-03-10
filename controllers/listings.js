const Listing = require("../models/listing.js");
const mapToken = process.env.MAP_TOKEN;
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


module.exports.index = async (req, res) => {
    const { category, search } = req.query;
    let filter = {};
    
    // Filter by category
    if (category && category !== 'all') {
        filter.category = category;
    }
    
    // Filter by search query (location, title, country)
    if (search && search.trim() !== '') {
        filter.$or = [
            { location: { $regex: search.trim(), $options: 'i' } },
            { title: { $regex: search.trim(), $options: 'i' } },
            { country: { $regex: search.trim(), $options: 'i' } }
        ];
    }
    
    const alllistings = await Listing.find(filter);
    res.render("listings/index.ejs", { 
        alllistings, 
        selectedCategory: category || 'all',
        searchQuery: search || ''
    });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res, next) => {
    let {id} = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: 'reviews',
            populate: {
                path: 'author'
            }
        })
        .populate("owner");
    if (!listing) {
        req.flash('error', 'Listing not found');
        return res.redirect('/listings');
    }
    console.log("Listing geometry:", listing.geometry);
    res.render("listings/show.ejs", {listing});
};

module.exports.createListing = async (req, res, next) => {
    // Get coordinates from location using Mapbox Geocoding
    let coordinate = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
    })
    .send();

    console.log("Mapbox response:", coordinate.body.features[0].geometry);
    
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);
    
    const newListing = new Listing(req.body.listing);
    
    // Set the owner to the current user
    newListing.owner = req.user._id;
    
    // Store geometry coordinates properly
    const geoData = coordinate.body.features[0].geometry;
    newListing.geometry = {
        type: geoData.type,
        coordinates: geoData.coordinates
    };
    console.log("Saving listing with geometry:", newListing.geometry);
    
    // Handle image upload from Cloudinary
    if (req.file) {
        newListing.image = {
            filename: req.file.filename,
            url: req.file.path
        };
    } else if (typeof newListing.image === 'string') {
        // Fallback for string URLs
        newListing.image = {
            filename: "listingimage",
            url: newListing.image
        };
    }
    
    await newListing.save();
    console.log("Listing saved successfully!");
    req.flash('success', 'Successfully created a new listing!');
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res, next) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash('error', 'Listing not found');
        return res.redirect('/listings');
    }
    let originalImageUrl=listing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload", "upload/h_300,w_250");
    res.render("listings/edit.ejs", {listing,originalImageUrl});
};

module.exports.updateListing = async (req, res, next) => {
    let {id} = req.params;
    let listingData = {...req.body.listing};
    
    // Get coordinates if location changed
    if (listingData.location) {
        try {
            let coordinate = await geocodingClient.forwardGeocode({
                query: listingData.location,
                limit: 1,
            }).send();
            
            if (coordinate.body.features.length > 0) {
                const geoData = coordinate.body.features[0].geometry;
                listingData.geometry = {
                    type: geoData.type,
                    coordinates: geoData.coordinates
                };
                console.log("Updated geometry:", listingData.geometry);
            }
        } catch (error) {
            console.log("Geocoding error:", error);
        }
    }
    
    // Handle image upload from Cloudinary
    if (req.file) {
        listingData.image = {
            filename: req.file.filename,
            url: req.file.path
        };
    } else if (typeof listingData.image === 'string') {
        // Convert image string to object if it's a string
        listingData.image = {
            filename: "listingimage",
            url: listingData.image
        };
    }
    
    await Listing.findByIdAndUpdate(id, listingData);
    req.flash('success', 'Successfully updated the listing!');
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res, next) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted the listing!');
    res.redirect('/listings');
};