const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: { path: "author" },
        })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing you requested does not exist!");
        return res.redirect("/listings");
    }

    res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res) => {
    let response = await geocodingClient
        .forwardGeocode({
            query: req.body.listing.location,
            limit: 1,
        })
        .send();

    if (!response.body.features.length) {
        req.flash("error", "Location not found. Please enter a valid location.");
        return res.redirect("/listings/new");
    }

    const newListing = new Listing(req.body.listing);

    newListing.owner = req.user._id;

    let url = req.file.path;
    let filename = req.file.filename;
    newListing.image = { url, filename };

    newListing.geometry = response.body.features[0].geometry;   // ye line add karo

    await newListing.save();
    req.flash("success", "New Listing created!");
    res.redirect("/listings");
};

   module.exports.renderEditForm = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing})

}

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (req.file) {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};

module.exports.searchListings = async (req, res) => {
    let { search } = req.query;

    if (!search) {
        return res.redirect("/listings");
    }

    const allListings = await Listing.find({
        $or: [
            { title: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
            { country: { $regex: search, $options: "i" } },
        ],
    });

    if (allListings.length === 0) {
        req.flash("error", "No listings found for your search!");
        return res.redirect("/listings");
    }

    res.render("listings/index.ejs", { allListings });
};


module.exports.filterListings = async (req, res) => {
    let { category } = req.params;

    const allListings = await Listing.find({ category: category });

    if (allListings.length === 0) {
        req.flash("error", `No listings found for ${category}!`);
        return res.redirect("/listings");
    }

    res.render("listings/index.ejs", { allListings });
};