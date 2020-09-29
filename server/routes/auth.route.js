const express = require('express');
const router = express.Router();

const {
    registerController,
    activationController,
    signinController,
    googleController ,
} = require('../controllers/auth.controller.js');

const {
    validRegister,
    validLogin,
    forgotPasswordValidator,
    resetPasswordValidator
} = require('../helper/valid');


router.post('/register', validRegister, registerController);
router.post('/activation', activationController);
router.post('/login', validLogin, signinController);
router.post('/googleLogin', googleController )
module.exports = router