var mongoose   = require("mongoose");
    Campground = require("./models/campground");
    Comment    = require("./models/comment");
    data       = [
        {
            name: "Cloud's Rest",
            image: "https://images.unsplash.com/photo-1479063589010-7697b04feb14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            name: "Canyon Floor",
            image: "https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            name: "Desert Mesa",
            image: "https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        }    
    ];

function seedDb() {
        //remove all campgrounds
    Campground.deleteMany({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("removed campgrounds");
        }
    });
    
        //add a few campgrounds
    data.forEach(function(seed) {
        Campground.create(seed, function (err, campground) {
            if(err){
                console.log(err);
            }else{
                console.log("added a campground");
                //create a comment
                Comment.create({
                    text: "This place is great, but I wish there was internet",
                    author: "Homer"
                }, function (err, comment) {
                    if(err){
                        console.log(err);
                    }else{
                        campground.comments.push(comment);
                        campground.save();
                        console.log("created a comment");
                    }
                });
            }
        }); 
    });
       
}

module.exports = seedDb;

  