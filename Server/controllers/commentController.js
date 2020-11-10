const commentDao = require("../dao/commentDao");

/* 새로운 코멘트 생성 */
exports.insertComment = async (req, res) => {
  try {
    let { authorId, issueId, content } = req.body;
    let newComment = await commentDao.insertComment(authorId, issueId, content);
    if (newComment.success) {
      return res.status(200).json({
        success: true,
        newComment,
      });
    }
    return res.status(400).json({
      success: false,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
};

/* 코멘트 수정 */
exports.updateComment = async (req, res) => {
  try {
    let { commentId, authorId, issueId, content } = req.body;
    let comment = await commentDao.updateComment(
      commentId,
      authorId,
      issueId,
      content
    );
    if (comment.success) {
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
      error,
    });
  }
};

exports.getIssuesByCommentId = async (req, res) => {
  try {
    let commentId = parseInt(req.params.commentId);
    let issues = await commentDao.getIssuesByCommentId(commentId);
    if (issues.success) {
      return res.status(200).json({ success: true, issues });
    }
    return res.status(400).json(issues);
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
};
