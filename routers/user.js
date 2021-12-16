const express = require('express');
const router = express.Router();
//const { kakaoUser } = require('../middlewares/kakaoUser');
const passport = require('passport');
const bcrypt = require('bcrypt');
const logInOnly =require('../middlewares/passportMidlewares')
const { userController } = require('../controllers')

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), userController.googleCallback);

router.get('/me', logInOnly, userController.me);

module.exports = router;
