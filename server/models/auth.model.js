const mongoose = require('mongoose');
const crypto = require('crypto');
const { truncate } = require('fs');

//User Schema
const userShcema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    hased_password: {
        type: String,
        required: true
    }
})