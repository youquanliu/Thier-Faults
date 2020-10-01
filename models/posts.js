var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: String,
    description: {
        type: String,
        required: true,
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    createdAt: {
        type: Date,
        required: true
    },
    html: {
        type: String,
        required: true
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("posts", postSchema);