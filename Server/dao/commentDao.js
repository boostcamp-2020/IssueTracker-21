const commentModel = require("../models").comment;
const issueModel = require("../models").issue;

exports.insertComment = async (authorId, issueId, content) => {
  return new Promise(async (resolve, reject) => {
    try {
      let newComment = await commentModel.create({
        authorId: authorId,
        issueId: issueId,
        content: content,
      });
      resolve({ success: true, newComment });
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

exports.getIssuesByCommentId = async (commentId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let issues = await issueModel.findAll({
        where: {
          id: commentId,
        },
      });
      resolve({ success: true, issues });
    } catch (e) {
      reject({ error: e });
    }
  });
};
