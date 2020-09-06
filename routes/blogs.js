var express = require("express");
var router = express.Router();
var Blog = require("../models/blogs");
var middleware = require("../middleware");

//INDEX - show all blogs
router.get("/", function (req, res) {
    // Get all blogs from DB
    Blog.find({}, function (err, allBlogs) {
        if (err) {
            console.log(err);
        } else {
            res.render("blogs/index", { blogs: allBlogs, page: 'blogs' });
        }
    });
});

// create route
router.post("/", middleware.isLoggedIn, function (req, res) {
    // get data from form
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newBlog = { name: name, image: image, description: desc, price: price, author: author };
    // create a new blog and save to database
    Blog.create(newBlog, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        }
        else {
            // redirect to blogs page
            res.redirect("/blogs");
            console.log(name + " added!")
        }
    })
});

// new route
router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("blogs/new");
});

// SHOW route - show more info
router.get("/:id", function (req, res) {
    // find blog of that id
    Blog.findById(req.params.id).populate("comments").exec(function (err, foundBlog) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(foundBlog)
            res.render("blogs/show", { blog: foundBlog });
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkBlogOwnership, function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
        res.render("blogs/edit", { blog: foundBlog });
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkBlogOwnership, function (req, res) {
    // find and update correct blog
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (err, updatedBlog) {
        if (err) {
            res.redirect("/blogs");
        }
        else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
    // Redirect to show page
});

// Destroy Blog route
router.delete("/:id", middleware.checkBlogOwnership, function (req, res) {
    Blog.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/blogs");
        }
        else {
            res.redirect("/blogs");
        }
    })
})

module.exports = router;
