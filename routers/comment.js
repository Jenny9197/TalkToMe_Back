const express = require('express');
const router = express.Router({mergeParams: true});
const { commentController } = require('../controllers');
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/middlewares");
const logInOnly =require('../middlewares/passportMidlewares')

router.get('/', commentController.getComment);

router.post('/', logInOnly, commentController.writeComment);

router.delete('/:commentId', logInOnly, commentController.deleteComment);

router.patch('/:commentId', logInOnly, commentController.editComment);

module.exports = router;
