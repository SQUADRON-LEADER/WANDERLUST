const mongoose = require('mongoose');
const initData = require('./data');
const Listing = require('../models/listing');

const MONGODB_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(MONGODB_URL);
  console.log('Connected to MongoDB');
  
  try {
    await Listing.deleteMany({});
    console.log("All listings deleted");
    initData.data=initData.data.map((obj)=>({...obj,owner:"686b9795446d8d79df1ad2eb"})); // Replace with actual user ID
    await Listing.insertMany(initData.data);
    console.log("Database initialized with sample data");
  } catch (err) {
    console.error("ERROR during initialization:", err);
  } finally {
    // Close the connection when done
    mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
}

main().catch(err => {
  console.error('Error:', err);
});
