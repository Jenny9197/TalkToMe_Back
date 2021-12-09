const express = require('express');
const router = express.Router();
const { kakaoUser } = require('../middlewares/kakaoUser');

router.post('/user/signin/kakao', kakaoUser, userController.auth);

module.exports = router;
