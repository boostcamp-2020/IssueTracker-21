const passport = require("passport");
const passportJWT = require("passport-jwt");

const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passportJWT.Strategy;
const GitHubStrategy = require("passport-github").Strategy;
const userController = require("../controllers/userController"); //userDB 연동 controller
const cookieExtractor = require("../utils/cookieExtractor").cookieExtractor; //req.cookies 토큰 추출

require("dotenv").config();

const LocalStrategyOption = {
  usernameField: "userId",
  passwordField: "password",
};
async function localVerify(userId, password, done) {
  try {
    const user = await userController.localStrategyLogin(userId, password);
    if (!user.success) {
      return done(null, false, {
        message: "아이디와 패스워드를 다시 확인해주세요",
      });
    }
    return done(null, user, { message: "로그인에 성공했습니다." });
  } catch (err) {
    return done(null, false, { message: "local verify err 발생" });
  }
}

const githubStrategyOption = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
};
async function githubVerify(accessToken, refreshToken, profile, done) {
  try {
    const userId = profile.id;
    const userName = profile.username;
    const photoUrl = profile.photos[0].value;

    const result = await userController.gitlogin(userId);
    const user = { userId, userName, photoUrl };

    // 성공
    if (result) {
      return done(null, user);
    }
    // done에 답기는 두번째 인자는 이후 사용 될 user 값
    return done(null, false, { message: "깃허브 로그인에 실패했습니다." });
  } catch (err) {
    return done(null, false, { message: "GitHub verify err 발생" });
  }
}

const jwtStrategyOption = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET,
};
async function jwtVerift(payload, done) {
  try {
    const result = await userController.isExist(payload.userId);
    if (!result) {
      return done(null, false, { message: "JWT 토큰 인증에 실패했습니다." });
    }
    return done(null, [result]);
  } catch (err) {
    return done(null, false, { message: "JWT verify err 발생" });
  }
}

module.exports = () => {
  passport.use(new LocalStrategy(LocalStrategyOption, localVerify));
  passport.use(new GitHubStrategy(githubStrategyOption, githubVerify));
  passport.use(new JWTStrategy(jwtStrategyOption, jwtVerift));
};
