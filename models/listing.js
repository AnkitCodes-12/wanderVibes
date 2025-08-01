const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("../models/review.js")

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        url: String,
        filename: String,
        // type: {
        //     filename: {type: String,},
        //     url: {type: String, required: true}
        // },
        // default: {
        //     filename: "listingImage",
        //     url: "https://images.unsplash.com/photo-1736297150541-89378f055b96?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // }

        // type: String,
        // required: true,
        // default: "https://images.unsplash.com/photo-1736297150541-89378f055b96?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // set: (v) => v === ""
        //     ? "https://images.unsplash.com/photo-1736297150541-89378f055b96?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        //     : v
    },
    price: {
        type: Number
    },
    location: {
        type: String
    },
    country: {
        type: String
    },
    review: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});

listingSchema.post("findOneAndDelete", async(listing) => {
    if(listing){
        await Review.deleteMany({_id: {$in: listing.review}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
