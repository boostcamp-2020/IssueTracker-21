const models = require("../models");
const issueModel = models.issue;
const commentModel = models.comment;
const assigneeModel = models.assignee;
const labelModel = models.label;
const issueLabelModel = models.issuelabel;
const milestoneModel = models.milestone;
const userModel = models.user;
const sequelize = require("sequelize");
const { Op, QueryTypes } = require("sequelize");
const { resolveConfigFile } = require("prettier");

/* 모든 이슈 조회 */
exports.getAllIssues = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let { count, rows } = await issueModel.findAndCountAll({
        distinct: true,
        order: [["id", "ASC"]],
        //order: [["id", "DESC"]],
        include: [
          {
            model: milestoneModel,
            required: false,
            attributes: ["id", "title"],
          },
          {
            model: commentModel,
            required: false,
            attributes: ["authorId"],
          },
          {
            model: userModel,
            as: "users",
            required: false,
            attributes: ["id", "profile"],
          },
          {
            model: labelModel,
            required: false,
            as: "labels",
          },
        ],
      });
      resolve({ success: true, count, rows });
    } catch (e) {
      reject({ error: e });
    }
  });
};

/* 이슈 상세 페이지 조회 */
exports.getIssueDetail = async (issueId) => {
  return new Promise(async (resolve, reject) => {
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
      resolve({ success: true, issueDetail, comments });
    } catch (e) {
      reject({ error: e });
    }
  });
};

/* 새로운 이슈 생성 */
exports.insertNewIssue = async (
  authorId,
  milestoneId,
  title,
  description,
  assignees,
  labels
) => {
  return new Promise(async (resolve, reject) => {
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
      resolve({ success: true });
    } catch (e) {
      reject({ error: e });
    }
  });
};

/* 이슈 수정 - 제목 */
exports.updateIssueTitle = async (title, authorId, issueId) => {
  return new Promise(async (resolve, reject) => {
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
      resolve({ success: true });
    } catch (e) {
      reject({ error: e });
    }
  });
};

/* 이슈 수정 - 내용 */
exports.updateIssueDescription = async (description, authorId, issueId) => {
  console.log(description, authorId, issueId);
  return new Promise(async (resolve, reject) => {
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
      resolve({ success: true });
    } catch (e) {
      reject({ error: e });
    }
  });
};

/* 이슈 수정- status */
exports.updateIssueStatus = async (newStatus, userId, issueId) => {
  return new Promise(async (resolve, reject) => {
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
      resolve({ success: true });
    } catch (e) {
      reject({ error: e });
    }
  });
};

/* 이슈에 라벨 추가 */
exports.insertNewLabel = async (issueId, labelId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await issueLabelModel.create({
        issueId: issueId,
        labelId: labelId,
      });
      resolve({ success: true });
    } catch (e) {
      reject({ error: e });
    }
  });
};

/* 이슈에 담당자 추가 */
exports.insertNewAssignee = async (issueId, assigneeId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await assigneeModel.create({
        issueId: issueId,
        userId: assigneeId,
      });
      resolve({ success: true });
    } catch (e) {
      reject({ error: e });
    }
  });
};

/* 이슈에 마일스톤 추가 */
exports.insertNewMilestone = async (milestoneId, issueId) => {
  return new Promise(async (resolve, reject) => {
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
      resolve({ success: true });
    } catch (e) {
      reject({ error: e });
    }
  });
};

/* 이슈 삭제 */
exports.deleteIssue = async (issueId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await issueModel.destroy({
        where: {
          id: issueId,
        },
      });
      resolve({ success: true });
    } catch (e) {
      reject({ error: e });
    }
  });
};

/* 이슈 filtering - 여러 조건 */
exports.filterIssues = async (filters) => {
  console.log(filters);
  const {
    authorId,
    labelId,
    milestoneId,
    assigneeId,
    status,
    commentorId,
  } = filters;
  return new Promise(async (resolve, reject) => {
    try {
      const issues = await issueModel.findAndCountAll({
        distinct: true,
        attributes: ["id"],
        include: [
          {
            model: milestoneModel,
            required: false,
            attributes: ["id", "title"],
          },
          {
            model: commentModel,
            required: false,
            attributes: ["authorId"],
          },
          {
            model: userModel,
            as: "users",
            required: false,
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
          "$labels.id$": labelId,
          milestoneId: milestoneId,
          "$users.id$": assigneeId,
          isOpened: status,
          "$comments.authorId$": commentorId,
        },
      });
      const issueRows = issues.rows;
      const issueIdArr = issueRows.map((e) => e.id);
      if (issueIdArr.length !== 0) {
        let { count, rows } = await issueModel.findAndCountAll({
          distinct: true,
          include: [
            {
              model: milestoneModel,
              required: false,
              attributes: ["title"],
            },
            {
              model: commentModel,
              required: false,
              attributes: ["authorId"],
            },
            {
              model: userModel,
              as: "users",
              required: false,
              attributes: ["id", "profile"],
            },
            {
              model: labelModel,
              required: false,
              as: "labels",
            },
          ],
          where: {
            id: {
              [Op.or]: issueIdArr,
            },
          },
        });
        resolve({ success: true, count, rows });
      } else {
        resolve({ success: true, count: 0 });
      }
    } catch (e) {
      reject({ error: e });
    }
  });
};

/* 이슈 filtering - author */
exports.filterIssuesByAuthor = async (authorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const issues = await issueModel.findAndCountAll({
        distinct: true,
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
      resolve({ success: true, issues: issues });
    } catch (e) {
      reject({ error: e });
    }
  });
};

/* 이슈 filtering - label */
// exports.filterIssuesByLabel = async (labelId) => {
//   return new Promise(async (resolve, reject) => {
//       try{
//         const issues = await issueModel.findAndCountAll({
//           distinct: true,
//           attributes: ['id'],
//               include: [
//                 {
//                   model: labelModel,
//                   required: false,
//                   as: "labels",
//                   attributes: ["id"],
//                 },
//               ],
//               where: {
//                 "$labels.id$": labelId,
//               },
//             });
//             const issueRows = issues.rows;
//             const issueIdArr = issueRows.map(e => e.id);
//             let { count, rows } = await issueModel.findAndCountAll({
//               distinct: true,
//                 include: [
//                   {
//                     model: milestoneModel,
//                     required: false,
//                     attributes: ["title"],
//                   },
//                   {
//                     model: userModel,
//                     as: "users",
//                     required: false,
//                     attributes: ["id", "profile"],
//                   },
//                   {
//                     model: labelModel,
//                     required: false,
//                     as: "labels",
//                   },
//                 ],
//                 where: {
//                   id: {
//                   [Op.or]: issueIdArr
//                 }}
//               });

//           resolve({success:true, count, rows});
//       }catch(e){
//           reject({error:e});
//       }
//   });
// }
const labelFilterQuery = `
SELECT ii.*, il.*, m.title, l.name, l.color
FROM issues ii
LEFT JOIN issuelabels il ON ii.id = il.issueId
LEFT JOIN milestones m ON m.id = ii.milestoneId
LEFT JOIN labels l ON il.labelId = l.id
,
(SELECT i.id FROM issues i
LEFT JOIN issuelabels il ON i.id = il.issueId
LEFT JOIN labels l ON il.labelId = l.id
WHERE l.id = :lid ) sub
WHERE ii.id = sub.id`;

exports.filterIssuesByLabel = async (labelId) => {
  return new Promise(async (resolve, reject) => {
    try {
      models.sequelize
        .query(labelFilterQuery, {
          replacements: { lid: labelId },
          type: sequelize.QueryTypes.SELECT,
        })
        .then(function (issues) {
          resolve({ success: true, issues });
        });
    } catch (e) {
      reject({ error: e });
    }
  });
};

/* 이슈 filtering - milestone */
exports.filterIssuesByMilestone = async (milestoneId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const issues = await issueModel.findAndCountAll({
        distinct: true,
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
      resolve({ success: true, issues });
    } catch (e) {
      reject({ error: e });
    }
  });
};

/* 이슈 filtering - assignee */
const assigneeFilterQuery = `
SELECT ii.*, u.id as assigneeId, u.profile, m.title as milestoneTitle, l.name as labelName, l.color as labelColor
FROM issues ii
LEFT JOIN issuelabels il ON ii.id = il.issueId
LEFT JOIN assignees al ON ii.id = al.issueId
LEFT JOIN milestones m ON m.id = ii.milestoneId
LEFT JOIN labels l ON il.labelId = l.id
LEFT JOIN users u ON al.userId = u.id
,
(SELECT i.id FROM issues i
LEFT JOIN assignees al ON i.id = al.issueId
LEFT JOIN users u ON al.userId = u.id
WHERE u.id = :aid ) sub
WHERE ii.id = sub.id`;

exports.filterIssuesByAssignee = async (assigneeId) => {
  return new Promise(async (resolve, reject) => {
    try {
      models.sequelize
        .query(assigneeFilterQuery, {
          replacements: { aid: assigneeId },
          type: sequelize.QueryTypes.SELECT,
        })
        .then(function (issues) {
          resolve({ success: true, issues });
        });
    } catch (e) {
      reject({ error: e });
    }
  });
};
/*exports.filterIssuesByAssignee = async (assigneeId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const issues = await issueModel.findAndCountAll({
        distinct: true,
        attributes: ["id"],
        include: [
          {
            model: userModel,
            as: "users",
            required: false,
            attributes: ["id"],
          },
        ],
        where: {
          "$users.id$": assigneeId,
        },
      });
      const issueRows = issues.rows;
      const issueIdArr = issueRows.map((e) => e.id);
      let { count, rows } = await issueModel.findAndCountAll({
        distinct: true,
        include: [
          {
            model: milestoneModel,
            required: false,
            attributes: ["title"],
          },
          {
            model: userModel,
            as: "users",
            required: false,
            attributes: ["id", "profile"],
          },
          {
            model: labelModel,
            required: false,
            as: "labels",
          },
        ],
        where: {
          id: {
            [Op.or]: issueIdArr,
          },
        },
      });

      resolve({ success: true, count, rows });
    } catch (e) {
      reject({ error: e });
    }
  });
};*/
// exports.filterIssuesByAssignee = async (assigneeId) => {
//     return new Promise(async (resolve, reject) => {
//         try{
//           const issues = await issueModel.findAndCountAll({
//             distinct: true,
//                 include: [
//                   {
//                     model: milestoneModel,
//                     required: false,
//                     attributes: ["title"],
//                   },
//                   {
//                     model: userModel,
//                     required: false,
//                     as: "users",
//                     attributes: ["id", "profile"],
//                   },
//                   {
//                     model: labelModel,
//                     required: false,
//                     as: "labels",
//                   },
//                 ],
//                 where: {
//                   "$users.id$": assigneeId,
//                 },
//               });
//             resolve({success:true, issues});
//         }catch(e){
//             reject({error:e});
//         }
//     });
// }

/* 이슈 filtering - status */
exports.getIssuesByStatus = async (status) => {
  return new Promise(async (resolve, reject) => {
    try {
      let issues = await issueModel.findAndCountAll({
        distinct: true,
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
          isOpened: status,
        },
      });
      resolve({ success: true, issues });
    } catch (e) {
      reject({ error: e });
    }
  });
};

/* 이슈 filtering - commentor */
const commentorFilterQuery = `
SELECT ii.*, u.id as assigneeId, u.profile, m.title as milestoneTitle, l.name as labelName, l.color as labelColor
FROM issues ii
LEFT JOIN issuelabels il ON ii.id = il.issueId
LEFT JOIN assignees al ON ii.id = al.issueId
LEFT JOIN milestones m ON m.id = ii.milestoneId
LEFT JOIN labels l ON il.labelId = l.id
LEFT JOIN users u ON al.userId = u.id
,
(SELECT i.id FROM issues i
LEFT JOIN comments cl ON i.id = cl.issueId
WHERE cl.authorId = 'test1' ) sub
WHERE ii.id = sub.id`;

exports.filterIssuesByCommentor = async (commentorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      models.sequelize
        .query(commentorFilterQuery, {
          replacements: { cid: commentorId },
          type: sequelize.QueryTypes.SELECT,
        })
        .then(function (issues) {
          resolve({ success: true, issues });
        });
    } catch (e) {
      reject({ error: e });
    }
  });
};
