const passport = require("passport");

require("dotenv").config();

exports.Auth = (req, res, next) => {
  passport.authenticate("jwt", { sessions: false }, (err, user) => {
    //실패 or err 분기
    if (err) return res.status(401).json({ result: false, error: err });
    if (!user) {
      return res
        .status(404)
        .json({ result: false, message: "로그인 해주세요!" });
    }
    req.user = user; // 인증을 마치면 req객체에 user 정보를 담아서 전달
    next();
  })(req, res, next);
};
