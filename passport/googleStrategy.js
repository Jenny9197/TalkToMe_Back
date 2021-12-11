const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require("../models/user");

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/user/google/callback',
      },
    //   function (accessToken, refreshToken, profile, cb) {
    //     User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //       return cb(err, user);
    //     });
    //   }
    async (accessToken, refreshToken, profile, done) => {
        console.log(accessToken, refreshToken);
        console.log("google profile", profile);
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
              nickname: profile.displayName,
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
