const express = require('express');
const router = express.Router();
const commentRouter = require('./comment');

router.get('/');

router.use('/:boardId/comment', [commentRouter]);

module.exports = router;