const express = require('express');
const passport = require("passport");

module.exports = function logInOnly(req, res, next) {
  try {
    console.log("어디가 문제야");
    passport.authenticate("jwt", (passportError, user, info) => {
      console.log('여기구나')
      if (passportError) {
        console.error("passportError:", passportError);
        return res.send({ message: passportError });
      }
      if (!user) {
        return res.status(401).send({ message: info.message });
      }
      res.locals.user = user.dataValues.userId;
      next();
    })(req, res, next);
  } catch (error) {
    console.error(error);
    return res.send({ message: error });
  }
};
