const passport = require("passport");
const passportJWT = require("passport-jwt");

const LocalStrategy = require("passport-local").Strategy;
const userController = require("../models/index");

require("dotenv").config();

const LocalStrategyOption = {
  usernameField: "userId",
  passwordField: "password",
};
async function localVerify(userId, password, done) {
  // db 조회 - 결과 값 result
  //const user = await userController.login(userId, password);
  if (!user.success) {
    return done(null, false, {
      message: "아이디와 패스워드를 다시 확인해주세요",
    });
  }
  return done(null, [user], { message: "로그인에 성공했습니다." });
}

module.exports = () => {
  passport.use(new LocalStrategy(LocalStrategyOption, localVerify));
};
