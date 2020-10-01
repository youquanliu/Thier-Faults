const express = require('express');
const router = express.Router();

const {
    index,
    newPost,
    show,
} = require('../controllers/main');

router.get('/', index); //go to main
router.post('/', newPost);
router.get('/:id', show);

module.exports = router;
