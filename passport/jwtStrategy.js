const passport = require('passport');
const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt');
const User = require('../models/user');

const JWTConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};

const JWTVerify = async (jwtPayload, done) => {
  try {
      console.log('어디냐?',jwtPayload)
      
    const user = await User.findOne({
      where: { userId: jwtPayload.userId },
    });
    
    if (user) {
      done(null, user);
      return;
    } else {
      done(null, false, { msg: '존재하지 않는 사용자 입니다.' });
    }
    done(null, false, { msg: '올바르지 않은 인증정보 입니다.' });
  } catch (error) {
    console.error(error);
    done(error);
  }
};
function jwt() {
  passport.use('jwt', new JWTStrategy(JWTConfig, JWTVerify));
}

module.exports = {JWTConfig, JWTVerify, jwt}