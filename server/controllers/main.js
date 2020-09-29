var User = require('../models/auth.model');
var Posts = require('../models/posts');
var Comment = require('../models/comments');

exports.index = (req, res) => {
    Posts.find({}, function (err, allPosts) {
        if (err) console.log(err);
        res.render('post/index', {
            posts: allPosts,
            User
        });
    });
}