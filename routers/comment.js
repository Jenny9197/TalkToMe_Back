const express = require('express');
const router = express.Router();
const { commentController } = require('../controllers');
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/middlewares");

router.get('/', commentController.getComment);

router.post('/', isLoggedIn, commentController.writeComment);

router.delete('/:comment_id', isLoggedIn, commentController.deleteComment);

router.patch('/:comment_id', isLoggedIn, commentController.editComment);

module.exports = router;
