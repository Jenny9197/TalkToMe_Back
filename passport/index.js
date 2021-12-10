const passport = require("passport");
// const google = require('passport-google-oauth2');
const google = require('./googleStrategy')
const User = require("../models/user");

module.exports = () => {
  passport.serializeUser((user, done) => {
      
    done(null, user.userId);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ where: { userId : id } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });
  google();
  // local();
  // kakao();
};
