const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing");

main()
    .then(() => {
        console.log("connection successful");
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderLust");
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "67f4c14b85d19b9cd5763d43"}));
    await Listing.insertMany(initData.data);
    console.log("data inserted successfuly");
}

initDB();