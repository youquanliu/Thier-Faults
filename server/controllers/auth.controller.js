const User = require('../models/auth.model');
const expressJwt = require('express-jwt');
const _ = require('lodash');
const { OAuth2Client } = require('google-auth-library');
const fetch = require('node-fetch');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
//Custom error handler to get userful error from database errors
const { errorHandler } = require('../helper/dbErrorHandling');
const sgMail = require('@sendgrid/mail');

exports.registerController = (req, res) => {
    const { name, email, password } = req.body
    console.log(name, email, password)

    //Validation to req,body
    if (!errors.isEmpty()) {
        const firstError = error.array().map(error => error.msg)[0]
        return res.status(422).json({
            error: firstError
        })
    } else {
        User.findOne({
            email
        }).exec((err, user) => {
            if (user) {
                return res.status(400).json({
                    error: "Email is taken"
                })
            }
        })
    }
}