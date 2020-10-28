const express = require('express');
const commentController = require("../../controllers/commentController");
const router = express.Router();

router.post("/", commentController.insertComment);

router.put("/", commentController.updateComment);

module.exports = router;
