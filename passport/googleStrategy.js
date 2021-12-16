const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require("../models/user");

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://ozam.shop/user/google/callback',
      },
    //   function (accessToken, refreshToken, profile, cb) {
    //     User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //       return cb(err, user);
    //     });
    //   }
    async (accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: "google" },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            console.log(profile.name);
            const newUser = await User.create({
              email: profile._json && profile._json.email,
              nickname: '아무개'+getRandomInt(1,10000),
              // nickname: profile.displayName,
              snsId: profile.id,
              provider: "google",
            });
            console.log(newUser);
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
function getRandomInt(min, max) { //min ~ max 사이의 임의의 정수 반환
  return Math.floor(Math.random() * (max - min)) + min;
}