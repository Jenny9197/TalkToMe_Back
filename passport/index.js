const passport = require("passport");
// const google = require('passport-google-oauth2');
const google = require('./googleStrategy')
const User = require("../models/user");

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log(user, '여기어때?')
    done(null, user.dataValues.userId);
    console.log(user.dataValues.userId);
    
  });

  passport.deserializeUser((id, done) => {
    console.log(id, '넌 뭐니?')
    User.findOne({ where: { userId : id } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });
  google();
  // local();
  // kakao();
};
