const express = require('express');
const router = express.Router();

const {
    index,
    newPost,
    show,
    getPostEdit,
    deleteOne
} = require('../controllers/main');

router.get('/', index); //go to main
router.post('/add-post', newPost);
router.get('/:id', show);  //detail page for each post


router.put('/update/:id', getPostEdit); // edit the post
router.delete('/:id', deleteOne)    //delete one post


module.exports = router;
