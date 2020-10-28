const express = require('express');

const { commentController } = require("../../controllers/commentController");

const router = express.Router();

router.post("/comment", commentController.insertComment);

router.put("/comment", commentController.updateComment);

module.exports = router;
