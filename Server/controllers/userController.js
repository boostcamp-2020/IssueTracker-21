const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const userModel = require("../models").user;

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
    let user = await userModel.findOne({
      where: { id: userId },
    });
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

exports.isExist = async (userId) => {
  try {
    let user = await userModel.findOne({
      where: { id: userId },
    });
    return { success: false };
  } catch (e) {
    return res.status(400).json({
      success: false,
      error: e,
    });
  }
};
