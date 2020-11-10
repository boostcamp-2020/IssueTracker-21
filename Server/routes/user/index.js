const express = require("express");
const userController = require("../../controllers/userController");
const router = express.Router();
const { Auth } = require("../../middleware/auth");

router.get("/users", userController.getAllUsers);
router.post("/login", userController.localLogin);
router.get("/userinfo", Auth, userController.userInfo);
router.get("/profile/:userId", userController.getProfileById);

router.post("/register", userController.localRegister);

router.get("/github", userController.githubLogin);
router.get("/github/callback", userController.githubCallback);

router.get("/auth", userController.authCheck);

module.exports = router;
