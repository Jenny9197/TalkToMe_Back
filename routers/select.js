const express = require('express');
const router = express.Router();
const { selectControllers } = require('../controllers');
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/middlewares");
const logInOnly =require('../middlewares/passportMidlewares')

// router.use((req, res, next) => {
//     res.locals.user = req.user;
//     next();
// })
router.get('/', selectControllers.getSelects) //게시글 전체 조회
router.post('/write', logInOnly, selectControllers.writeSelect); //게시글 작성
router.get('/:selectId', logInOnly,selectControllers.getSelect); //게시글 상세 조회
router.post('/:selectId', logInOnly, selectControllers.doSelect); //투표


module.exports = router;