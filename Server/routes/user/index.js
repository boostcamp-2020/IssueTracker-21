const express = require("express");
const userController = require("../../controllers/userController");
const router = express.Router();

router.post("/login", userController.localLogin);

router.get("/github", userController.githubLogin);
router.get("/github/callback", userController.githubCallback);

module.exports = router;
