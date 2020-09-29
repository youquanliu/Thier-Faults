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

sgMail.setApiKey(process.env.MAIL_KEY);

exports.registerController = (req, res) => {
    const { name, email, password } = req.body
    console.log(name, email, password);
    const errors = validationResult(req);

    //Validation to req,body
    if (!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0]
        return res.status(422).json({
            errors: firstError
        })
    } else {
        User.findOne({
            email
        }).exec((err, user) => {
            if (user) {
                return res.status(400).json({
                    errors: "Email is taken"
                })
            }
        })

        //GenerateToken
        const token = jwt.sign(
            {
                name,
                email,
                password
            },
            process.env.JWT_ACCOUNT_ACTIVATION,
            {
                expiresIn: '15m'
            }
        )
        //Email data sending
        const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Account activation link',
            html: `
                      <h1>Please use the following to activate your account</h1>
                      <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
                      <hr />
                      <p>This email may containe sensetive information</p>
                      <p>${process.env.CLIENT_URL}</p>
                  `
        };

        sgMail.send(emailData).then(sent => {
            return res.json({
                message: `Email has been sent to ${email}`
            })
        })
            .catch(err => {
                return res.status(400).json({
                    success: false,
                    errors: errorHandler(err)
                });
            });
    }
};

//Activation and save to database
exports.activationController = (req, res) => {

    const { token } = req.body;

    if (token) {//verify the token is valid or not or expired
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
            if (err) {
                console.log('Activation error');
                return res.status(401).json({
                    errors: 'Expired link. Signup again'
                });
            } else {
                // if valid, save to database
                //Get name email password from token
                const { name, email, password } = jwt.decode(token);

                console.log(email);
                const user = new User({
                    name,
                    email,
                    password
                });

                user.save((err, user) => {
                    if (err) {
                        console.log('Save error', errorHandler(err));
                        return res.status(401).json({
                            errors: errorHandler(err)
                        });
                    } else {
                        return res.json({
                            success: true,
                            user,
                            message: 'Signup success'
                        });
                    }
                });
            }
        });
    } else {
        return res.json({
            message: 'error happening please try again'
        });
    }
};

exports.signinController = (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0];
        return res.status(422).json({
            errors: firstError
        });
    } else {
        // check if user exist
        User.findOne({
            email
        }).exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    errors: 'User with that email does not exist. Please signup'
                });
            }
            //Authenticate
            if (!user.authenticate(password)) {
                return res.status(400).json({
                    errors: 'Email and password do not match'
                });
            }
            // generate a token and send to client
            const token = jwt.sign(
                {
                    _id: user._id
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '7d'
                }
            );
            const { _id, name, email, role } = user;
            return res.json({
                token,
                user: {
                    _id,
                    name,
                    email,
                    role
                }
            });
        })
    }
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT);
// Google Login
exports.googleController = (req, res) => {
    const { idToken } = req.body;

    client
        .verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT })
        .then(response => {
            // console.log('GOOGLE LOGIN RESPONSE',response)
            const { email_verified, name, email } = response.payload;
            if (email_verified) {
                User.findOne({ email }).exec((err, user) => {
                    if (user) {
                        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                            expiresIn: '7d'
                        });
                        const { _id, email, name, role } = user;
                        return res.json({
                            token,
                            user: { _id, email, name, role }
                        });
                    } else {
                        let password = email + process.env.JWT_SECRET;
                        user = new User({ name, email, password });
                        user.save((err, data) => {
                            if (err) {
                                console.log('ERROR GOOGLE LOGIN ON USER SAVE', err);
                                return res.status(400).json({
                                    error: 'User signup failed with google'
                                });
                            }
                            const token = jwt.sign(
                                { _id: data._id },
                                process.env.JWT_SECRET,
                                { expiresIn: '7d' }
                            );
                            const { _id, email, name, role } = data;
                            return res.json({
                                token,
                                user: { _id, email, name, role }
                            });
                        });
                    }
                });
            } else {
                return res.status(400).json({
                    error: 'Google login failed. Try again'
                });
            }
        });
};