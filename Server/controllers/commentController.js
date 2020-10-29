const commentDao = require("../dao/commentDao");

exports.insertComment = async (req, res) => {
  try {
    let { authorId, issueId, content } = req.body;
    let newComment = await commentDao.insertComment(authorId, issueId, content);
    if (newComment.success) {
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
