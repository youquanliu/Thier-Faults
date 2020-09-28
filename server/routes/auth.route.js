const express = require('express');
const router = express.Router();

const {
    registerController,
    activationController
} = require('../controllers/auth.controller.js');

const {
    validRegister,
    validLogin,
    forgotPasswordValidator,
    resetPasswordValidator
} = require('../helper/valid');


router.post('/register', validRegister, registerController);
router.post('/activation', activationController);

module.exports = router