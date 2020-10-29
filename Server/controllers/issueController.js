const models = require("../models");
const issueModel = models.issue;
const userModel = models.user;
const commentModel = models.comment;
const assigneeModel = models.assignee;
const labelModel = models.label;
const issueLabelModel = models.issuelabel;
const milestoneModel = models.milestone;
const sequelize = require("sequelize");
const { Op } = require("sequelize");

/* 모든 이슈 조회 */
exports.getAllIssues = async function (req, res, next) {
  try {
    const allIssues = await issueModel.findAndCountAll({
      include: [
        {
          model: milestoneModel,
          required: false,
          attributes: ["title"],
        },
        {
          model: userModel,
          as: "users",
          attributes: ["id", "profile"],
        },
        {
          model: labelModel,
          as: "labels",
        },
      ],
    });
    return res.status(200).json({
      success: true,
      issues: allIssues,
    });
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, status: 400, message: e.message });
  }
};

/* 이슈 상세 페이지 조회 */
exports.getIssueDetail = async function (req, res, next) {
  const issueId = req.params.issueId;
  try {
    const issueDetail = await issueModel.findOne({
      include: [
        {
          model: milestoneModel,
          required: false,
          attributes: ["title"],
        },
        {
          model: userModel,
          as: "users",
          attributes: ["id", "profile"],
        },
        {
          model: labelModel,
          as: "labels",
        },
      ],
      where: {
        id: issueId,
      },
    });
    const comments = await commentModel.findAndCountAll({
      where: {
        issueId: issueId,
      },
    });
    return res.status(200).json({
      success: true,
      issue: issueDetail,
      comment: comments,
    });
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, status: 400, message: e.message });
  }
};

/* 새로운 이슈 생성 */
exports.insertNewIssue = async function (req, res, next) {
  const {
    title,
    authorId,
    description,
    milestoneId,
    assignees,
    labels,
  } = req.body;
  try {
    const newIssue = await issueModel.create({
      authorId: authorId,
      milestoneId: milestoneId,
      title: title,
      description: description,
    });
    assignees.forEach((element) => {
      assigneeModel.create({
        issueId: newIssue.dataValues.id,
        userId: element,
      });
    });
    labels.forEach((element) => {
      issueLabelModel.create({
        issueId: newIssue.dataValues.id,
        labelId: element,
      });
    });

    return res.status(200).json({
      success: true,
    });
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, status: 400, message: e.message });
  }
};

/* 이슈 수정 - 제목 */
exports.updateIssueTitle = async function (req, res, next) {
  const { issueId, title, authorId } = req.body;
  try {
    await issueModel.update(
      {
        title: title,
        authorId: authorId,
      },
      {
        where: {
          id: issueId,
        },
      }
    );
    return res.status(200).json({
      success: true,
    });
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, status: 400, message: e.message });
  }
};

/* 이슈 수정 - 내용 */
exports.updateIssueDescription = async function (req, res, next) {
  const { issueId, description, authorId } = req.body;
  try {
    await issueModel.update(
      {
        description: description,
        authorId: authorId,
      },
      {
        where: {
          id: issueId,
        },
      }
    );
    return res.status(200).json({
      success: true,
    });
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, status: 400, message: e.message });
  }
};

/* 이슈 수정- status */
exports.updateIssueStatus = async function (req, res, next) {
  const { issueId, newStatus, userId } = req.body;
  try {
    await issueModel.update(
      {
        isOpened: newStatus,
        lastStatusChanger: userId,
      },
      {
        where: {
          id: issueId,
        },
      }
    );
    return res.status(200).json({
      success: true,
    });
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, status: 400, message: e.message });
  }
};

/* 이슈에 라벨 추가 */
exports.insertNewLabel = async function (req, res, next) {
  const { issueId, labelId } = req.body;
  try {
    await issueLabelModel.create({
      issueId: issueId,
      labelId: labelId,
    });
    return res.status(200).json({
      success: true,
    });
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, status: 400, message: e.message });
  }
};

/* 이슈에 담당자 추가 */
exports.insertNewAssignee = async function (req, res, next) {
  const { issueId, assigneeId } = req.body;
  try {
    await assigneeModel.create({
      issueId: issueId,
      userId: assigneeId,
    });
    return res.status(200).json({
      success: true,
    });
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, status: 400, message: e.message });
  }
};

/* 이슈에 마일스톤 추가 */
exports.insertNewMilestone = async function (req, res, next) {
  const { issueId, milestoneId } = req.body;
  try {
    await issueModel.update(
      {
        milestoneId: milestoneId,
      },
      {
        where: {
          id: issueId,
        },
      }
    );
    return res.status(200).json({
      success: true,
    });
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, status: 400, message: e.message });
  }
};

/* 이슈 삭제 */
exports.deleteIssue = async function (req, res, next) {
  const { issueId } = req.body;
  try {
    await issueModel.destroy({
      where: {
        id: issueId,
      },
    });
    return res.status(200).json({
      success: true,
    });
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, status: 400, message: e.message });
  }
};

/* 이슈 filtering - author */
exports.filterIssuesByAuthor = async function (req, res, next) {
  const authorId = req.params.authorId;
  try {
    const issues = await issueModel.findAndCountAll({
      include: [
        {
          model: milestoneModel,
          required: false,
          attributes: ["title"],
        },
        {
          model: userModel,
          required: false,
          as: "users",
          attributes: ["id", "profile"],
        },
        {
          model: labelModel,
          required: false,
          as: "labels",
        },
      ],
      where: {
        authorId: authorId,
      },
    });
    return res.status(200).json({
      success: true,
      issues: issues,
    });
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, status: 400, message: e.message });
  }
};

/* 이슈 filtering - label */
exports.filterIssuesByLabel = async function (req, res, next) {
  const labelId = req.params.labelId;
  try {
    const issues = await issueModel.findAndCountAll({
      include: [
        {
          model: milestoneModel,
          required: false,
          attributes: ["title"],
        },
        {
          model: userModel,
          required: false,
          as: "users",
          attributes: ["id", "profile"],
        },
        {
          model: labelModel,
          required: false,
          as: "labels",
        },
      ],
      where: {
        "$labels.id$": labelId,
      },
    });
    return res.status(200).json({
      success: true,
      issues: issues,
    });
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, status: 400, message: e.message });
  }
};

/* 이슈 filtering - milestone */
exports.filterIssuesByMilestone = async function (req, res, next) {
  const milestoneId = req.params.milestoneId;
  try {
    const issues = await issueModel.findAndCountAll({
      include: [
        {
          model: milestoneModel,
          required: false,
          attributes: ["title"],
        },
        {
          model: userModel,
          required: false,
          as: "users",
          attributes: ["id", "profile"],
        },
        {
          model: labelModel,
          required: false,
          as: "labels",
        },
      ],
      where: {
        milestoneId: milestoneId,
      },
    });
    return res.status(200).json({
      success: true,
      issues: issues,
    });
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, status: 400, message: e.message });
  }
};

/* 이슈 filtering - assignee */
exports.filterIssuesByAssignee = async function (req, res, next) {
  const assigneeId = req.params.assigneeId;
  try {
    const issues = await issueModel.findAndCountAll({
      include: [
        {
          model: milestoneModel,
          required: false,
          attributes: ["title"],
        },
        {
          model: userModel,
          required: false,
          as: "users",
          attributes: ["id", "profile"],
        },
        {
          model: labelModel,
          required: false,
          as: "labels",
        },
      ],
      where: {
        "$users.id$": assigneeId,
      },
    });
    return res.status(200).json({
      success: true,
      issues: issues,
    });
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, status: 400, message: e.message });
  }
};
