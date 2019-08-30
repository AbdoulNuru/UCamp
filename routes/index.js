var express  = require("express"),
    router   = express.Router(),
    passport = require("passport"),
    User     = require("../models/user");

//root route
router.get("/", function (req, res) {
    res.render("landing");
})

//sign up page route
router.get("/register", function (req, res) {
    res.render("register");
});

//sign up route
router.post("/register", function (req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function () {
            req.flash("success", "Welcome to YelpCamp "+ user.username);
            res.redirect("/campgrounds");
            });
        }
    });
});

//login page route
router.get("/login", function (req, res) {
    res.render("login");
});

//login route
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function (req, res) {

    });

//logout route
router.get("/logout", function (req, res) {
    req.logOut();
    req.flash("success", "Logged you out");
    res.redirect("/campgrounds");
});

module.exports = router;