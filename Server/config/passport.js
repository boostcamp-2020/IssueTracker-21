const passport = require("passport");
const passportJWT = require("passport-jwt");

const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passportJWT.Strategy;
const userController = require("../controllers/userController"); //userDB 연동 controller
const cookieExtractor = require("../utils/cookieExtractor"); //req.cookies 토큰 추출

require("dotenv").config();

const LocalStrategyOption = {
  usernameField: "userId",
  passwordField: "password",
};
async function localVerify(userId, password, done) {
  const user = await userController.login(userId, password);
  if (!user.success) {
    return done(null, false, {
      message: "아이디와 패스워드를 다시 확인해주세요",
    });
  }
  return done(null, [user], { message: "로그인에 성공했습니다." });
}

const jwtStrategyOption = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET,
};
async function jwtVerift(payload, done) {
  const result = await userController.isExist(payload.id);
  if (!result) {
    return done(null, false, { message: "토큰 인증에 실패했습니다." });
  }
  return done(null, [result]);
}

module.exports = () => {
  passport.use(new LocalStrategy(LocalStrategyOption, localVerify));
  passport.use(new JWTStrategy(jwtStrategyOption, jwtVerift));
};
