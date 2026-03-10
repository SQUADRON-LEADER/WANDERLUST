const mongoose = require('mongoose');
const Listing = require('./models/listing.js');

async function deleteListing() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/nestigo');
        console.log('Connected to database...');
        
        // First, let's see all listings
        console.log('All listings in database:');
        const allListings = await Listing.find({}).select('title location');
        
        if (allListings.length === 0) {
            console.log('No listings found in database.');
            await mongoose.connection.close();
            return;
        }
        
        allListings.forEach((listing, index) => {
            console.log(`${index + 1}. "${listing.title}" - ${listing.location}`);
        });
        
        // Find and delete any listing with "beachfront" and "cottage"
        const targetListings = allListings.filter(listing => 
            listing.title.toLowerCase().includes('beachfront') && 
            listing.title.toLowerCase().includes('cottage')
        );
        
        if (targetListings.length > 0) {
            console.log('\nFound matching beachfront cottage listings:');
            for (const listing of targetListings) {
                console.log(`Deleting: "${listing.title}"`);
                await Listing.findByIdAndDelete(listing._id);
                console.log(`✅ Successfully deleted "${listing.title}"!`);
            }
        } else {
            // If exact match not found, look for any listing with either word
            const partialMatches = allListings.filter(listing => 
                listing.title.toLowerCase().includes('beachfront') || 
                listing.title.toLowerCase().includes('cottage') ||
                listing.title.toLowerCase().includes('cozy')
            );
            
            if (partialMatches.length > 0) {
                console.log('\nFound partial matches:');
                for (const listing of partialMatches) {
                    console.log(`Deleting: "${listing.title}"`);
                    await Listing.findByIdAndDelete(listing._id);
                    console.log(`✅ Successfully deleted "${listing.title}"!`);
                }
            } else {
                console.log('\n❌ No beachfront cottage listings found to delete');
            }
        }
        
        await mongoose.connection.close();
        console.log('\nDatabase connection closed.');
        
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
}

deleteListing();
