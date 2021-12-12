const express = require('express');
const router = express.Router();
const { kakaoUser } = require('../middlewares/kakaoUser');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/middlewares');
const { userController } = require('../controllers')

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), userController.googleCallback);

// router.post('/user/signin/kakao', kakaoUser, userController.auth);

module.exports = router;
