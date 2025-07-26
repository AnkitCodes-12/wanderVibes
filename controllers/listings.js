const Listing = require("../models/listing");

module.exports.index = async(req, resp) => {
    await Listing.find({}).then(res => resp.render("listings/index.ejs", { res }));
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, resp) => {
    let { id } = req.params;
    let data = await Listing.findById(id)
        .populate({
            path: "review",
        populate: {
            path: "author",
        },
    })
    .populate("owner");
    if(!data){
        req.flash("error", "Listing does not exist!");
        resp.redirect("/listings");
    }
    resp.render("listings/show.ejs", { data });
};

module.exports.createListing = async (req, res, next) => {
    // let {title, filename, location, country, description, url, price} = req.body;
    let url = req.file.path;
    let filename = req.file.filename;
    req.body.listing.owner = req.user._id;
    let newListing = new Listing(req.body.listing);
    newListing.image = {url, filename};
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    let data = await Listing.findById(id);
    if(!data){
        req.flash("error", "Listing does not exist!");
        res.redirect("/listings");
    }
    let originalImageUrl = data.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/h_300,w_250,e_blur:300");
    res.render("listings/edit.ejs", { data, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url, filename};
    await listing.save();
    }

    req.flash("success", "Listing Edited!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    console.log("deletedListing is : ", deletedListing);
    res.redirect("/listings");
};

