var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/",function(req,res){
    res.render("landing");
});


// AUTH ROUTES
// show register form
router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});

//show login form
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

router.post("/register",function(req, res) {
    User.register(new User({username: req.body.username}),req.body.password,function(err,user){
        if(err){
            // console.log("_______INSIDE________");
            req.flash("error",err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","Welcome to YelpCamp, "+ user.username);
            res.redirect("/campgrounds");
        });
    });
});



router.post("/login", passport.authenticate("local",
    {
        successRedirect:"/campgrounds",
        failureRedirect:"/login"
    }), function(req, res) {
    // console.log("ghdj");
});
router.get("/logout",function(req, res) {
    req.logout();
    req.flash("success","Logged you out!");
    res.redirect("/campgrounds");
});

// 
module.exports = router;
