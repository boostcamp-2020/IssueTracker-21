const commentModel = require("../models").comment;

exports.insertComment = async (authorId, issueId, content) => {
  return new Promise(async (resolve, reject) => {
    try {
      await commentModel.create({
        authorId: authorId,
        issueId: issueId,
        content: content,
      });
      resolve({ success: true });
    } catch (e) {
      reject({ error: e });
    }
  });
};

exports.updateComment = async (commentId, authorId, issueId, content) => {
  return new Promise(async (resolve, reject) => {
    try {
      await commentModel.update(
        {
          authorId: authorId,
          issueId: issueId,
          content: content,
        },
        { where: { id: commentId } }
      );
      resolve({ success: true });
    } catch (e) {
      reject({ error: e });
    }
  });
};
