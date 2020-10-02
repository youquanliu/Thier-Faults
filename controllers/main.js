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
    try {
        const savedPost = await newPost.save();
        res.json(savedPost);
    } catch (err) {
        console.error(err);
    }
}

//Deatil page
exports.show = (req, res) => {
    Posts.findById(req.params.id, function (err, post) {
        if (err) console.log(err);
        res.json(post)
    })
}

//update on post
exports.getPostEdit = (req, res) => {
    Posts.findById(req.params.id)
        .then(post => {
            post.name = req.body.name;
            post.image = req.body.image;
            post.description = req.body.description;

            post
                .save()
                .then(() => res.json("post is updated successfully"))
                .catch(err => res.status(400).json(`Error: ${err}`))
        })
}


//delete one post
exports.deleteOne = (req, res) => {
    Posts.findByIdAndDelete(req.params.id)
        .then(() => res.json("the artical is deleted"))
        .catch(err => { res.status(400).json(`Error:${err}`) })
}