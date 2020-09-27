const mongoose = require('mongoose');
const crypto = require('crypto');
const { truncate } = require('fs');

//User Schema
const userScheama = new mongoose.Schema({
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
    },
    salt: String,
    role: {
        type: String,
        default: 'Normal'
    },
    resetPasswordLink: {
        data: String,
        default: ''
    }
},
    { timeStamp: true })

//Virtual Password
userScheama.virtual('password')
    .set(function (password) {
        this.password = password
        this.salt = this.makeSalt()
        this.hased_password = this.encyptPassword(password)
    })
    .get(function () {
        return this._password
    })

userScheama.methods = {
    //Compare password between plain get from user and hased
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    //Encrypt Password
    encryptPassword: function (password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    },
    //Generat salt
    makeSalt: function () {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    }
};

module.exports = mongoose.model('User', userScheama);
