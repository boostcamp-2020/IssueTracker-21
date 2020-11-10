const passport = require("passport");

require("dotenv").config();

exports.Auth = (req, res, next) => {
  passport.authenticate("jwt", { sessions: false }, (err, user) => {
    //실패 or err 분기
    if (err || !user || !user[0].success) {
      next();
    }
    req.user = user[0]; // 인증을 마치면 req객체에 user 정보를 담아서 전달
    next();
  })(req, res, next);
};
