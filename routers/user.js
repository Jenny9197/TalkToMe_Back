const express = require('express');
const router = express.Router();
const { kakaoUser } = require('../middlewares/kakaoUser');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/middlewares');
const User = require('../models/user');

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.json({ result: '로그인 성공' });
});

// router.post('/user/signin/kakao', kakaoUser, userController.auth);

module.exports = router;
