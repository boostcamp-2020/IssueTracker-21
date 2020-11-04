const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const userDao = require("../dao/userDao");

/* local 로그인 */

exports.localLogin = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        success: false,
        message: "Something is not right",
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      console.log(user);
      const token = jwt.sign(user, process.env.JWT_SECRET);
      res.cookie("token", token, {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        signed: true,
      });
      return res.json({ success: true });
    });
  })(req, res);
};

exports.localStrategyLogin = async (userId, password) => {
  try {
    const user = await userDao.getUser(userId);

    if (password === user.dataValues.password) {
      return {
        success: true,
        userId: user.dataValues.id,
        profile: user.dataValues.profile,
      };
    }
    return { success: false };
  } catch (e) {
    return res.status(400).json({
      success: false,
      error: e,
    });
  }
};

/* local 회원가입*/

exports.localRegister = async (req, res, next) => {
  try {
    const { id, password, profile } = req.body;
    const user = await userDao.insertUser(id, password, profile);
    if (user.success) {
      return res.status(200).json({
        success: true,
      });
    }
    return res.status(400).json({
      success: false,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.error,
    });
  }
};

/* github 로그인 */

exports.githubLogin = passport.authenticate("github");

exports.githubCallback = async (req, res, next) => {
  passport.authenticate("github", (err, profile) => {
    if (err || !profile) {
      return res.status(400).redirect("/login");
    }
    req.login(profile, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }

      const token = jwt.sign(profile, process.env.JWT_SECRET);
      res.cookie("token", token, {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        signed: true,
      });
      return res.status(200).redirect("/");
    });
  })(req, res);
};
exports.gitStrategyLogin = async (profiles) => {
  //git 정보가 db에 있는지 확인
  let user = await userDao.getUser(profiles.username);
  //db에 저장이 안 되어있을 경우 새로 db에 저장
  if (user === null) {
    try {
      const id = profiles.username;
      const profile = profiles.photos[0].value;
      const password = "github";

      const result = await userDao.insertUser(id, password, profile);
    } catch (e) {
      return {
        success: false,
      };
    }
  } else if (user !== null && user.password !== "github") {
    console.log("깃헙아님", user.password);
    //깃헙으로 가입하지 않은 아이디로 이미 가입되어져 있는 경우 오류 처리
    return {
      success: false,
    };
  }

  return {
    success: true,
    userId: profiles.username,
    profile: profiles.photos[0].value,
  };
};

/* 인증 middleware용 db 조회 함수 */

exports.isExist = async (userId) => {
  try {
    let user = await userDao.getUser({ userID });
    return {
      success: true,
      userId: user.dataValues.id,
      profile: user.dataValues.profile,
    };
  } catch (e) {
    return res.status(400).json({
      success: false,
      error: e,
    });
  }
};

exports.authCheck = (req, res) => {
  let token = req.cookies.user;
  if (token != null) {
    let decode = false;
    jwt.verify(token, secretObj.secret, (err, decoded) => {
      if (err) {
        decode = false;
        return res.json({
          verify: false,
        });
      } else {
        decode = decoded;
        return res.json({
          verify: true,
        });
      }
    });
  } else {
    return res.json({
      verify: false,
    });
  }
};
