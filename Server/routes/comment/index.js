const express = require('express');
const commentController = require("../../controllers/commentController");
const router = express.Router();

/* url 라우팅 */
router.post("/", commentController.insertComment);

router.put("/", commentController.updateComment);

router.get("/:commentId", commentController.getIssuesByCommentId);

module.exports = router;
