const express = require("express");
const userController = require("../../controllers/userController");
const router = express.Router();

router.post("/login", userController.login);

router.post("/github", userController.githubLogin);
router.post("/github/callback", userController.githubCallback);

module.exports = router;
