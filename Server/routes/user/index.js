const express = require("express");
const userController = require("../../controllers/userController");
const router = express.Router();

router.get("/users", userController.getAllUsers);
router.post("/login", userController.localLogin);

router.post("/register", userController.localRegister);

router.get("/github", userController.githubLogin);
router.get("/github/callback", userController.githubCallback);

router.get("/auth", userController.authCheck);

module.exports = router;
