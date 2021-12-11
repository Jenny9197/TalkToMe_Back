const express = require('express');
const router = express.Router();
const { boardController } = require("../controllers");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/middlewares")
// 로그인 했을때와 안했을때 미들웨어
//const { logInOnly, logInBoth } = require("");

// 고민작성페이지
router.post('/write', isLoggedIn, boardController.postCreate);
// 고민상세페이지 - 게시글 상세 조회
//router.get('/:boardId', boardCtrl.posting.postRead);   
// 고민상세페이지 - 게시글 좋아요, 취소
//router.post('/:boardId/like', boardCtrl.posting.postLike);

const commentRouter = require('./comment');


router.use('/:boardId/comment', [commentRouter]);

module.exports = router;