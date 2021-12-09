const express = require('express');
const router = express.Router();
const { selectControllers } = require('../controllers')

router.get('/', selectControllers.getSelects) //게시글 전체 조회
router.post('/write', selectControllers.writeSelect); //게시글 작성
router.get('/:selectId', selectControllers.getSelect); //게시글 상세 조회
router.post('/', selectControllers.doSelect); //투표


module.exports = router;