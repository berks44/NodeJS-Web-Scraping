const mongoose = require("mongoose")


const listingSchema = new mongoose.Schema({
    artist: String,
    name: String,
    difficulty: String,
    url: String,
    img1: String,
    img2: String,
    midi: String,
    about:String
});

const Listing = mongoose.model("Koleksiyon", listingSchema);

module.exports = Listing;