const express = require('express');
const router = express.Router();

const userRouter = require('./user');
const boardRouter = require('./board');
// const commentRouter = require('./comment');
const selectRouter = require('./select');
const searchRouter = require('./search')


router.use('/user', [userRouter]);
router.use('/board', [boardRouter]);
// router.use('/comment', [commentRouter]);
router.use('/select', [selectRouter]);
router.use('/search', [searchRouter]);


module.exports = router;