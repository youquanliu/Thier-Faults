const express = require('express');
const router = express.Router();

const {
    index,
} = require('../controllers/main');

router.get('/', mainCtrl.index); //go to main
