var User = require('../models/auth.model');
var Posts = require('../models/posts');
var Comment = require('../models/comments');

exports.index = (req, res) => {
 
    console.log("from index")
    Posts.find({}, function (err, allPosts) {
        if (err) console.log(err);
        res.json(allPosts)
    });
}

exports.newPost = async (req, res) => {

    console.log(req.body);
    const newPost = new Posts(req.body);

    // newPost.author = {
    //     id: req.user._id,
    //     username: req.user.name
    // };
    try {
        const savedPost = await newPost.save();
        res.json(savedPost);
    } catch (err) {
        console.error(err);
    }
}

exports.show = (req, res) => {
    Posts.findById(req.params.id, function (err, post) {
        if (err) console.log(err);
        res.json(post)
    })
}
