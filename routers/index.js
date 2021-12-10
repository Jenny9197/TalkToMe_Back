const express = require('express');
const router = express.Router();

const userRouter = require('./user');
const boardRouter = require('./board');
const commentRouter = require('./comment');
const selectRouter = require('./select');


router.use('/user', [userRouter]);
router.use('/board', [boardRouter]);
router.use('/comment', [commentRouter]);
router.use('/select', [selectRouter]);


module.exports = router;