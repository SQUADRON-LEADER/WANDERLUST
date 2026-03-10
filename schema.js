const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().allow(''),
        image: Joi.alternatives().try(
            Joi.string().uri().default("https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"),
            Joi.object({
                filename: Joi.string().default("listingimage"),
                url: Joi.string().uri().required()
            })
        ),
        price: Joi.number().required().min(0),
        location: Joi.string().required(),
        country: Joi.string().allow(''),
        category: Joi.string().valid(
            'Trending',
            'Rooms', 
            'Iconic Cities',
            'Lakefront',
            'Beach',
            'Forests',
            'City',
            'Arctic',
            'Farms',
            'Camping'
        ).default('Trending')
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required() 
    }).required()
});