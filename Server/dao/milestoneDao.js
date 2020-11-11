const milestoneModel = require("../models").milestone;
const issueModel = require("../models").issue;
const models = require("../models");
const sequelize = require("sequelize");

const milestoneQuery = `
SELECT
m.*, 
i.isOpened AS issueIsOpened,
COUNT(i.isOpened) AS count
FROM milestones m
LEFT OUTER JOIN 
issues i
ON m.id = i.milestoneId
GROUP BY 
i.isOpened, m.id
ORDER BY
m.id;
`

const mileStoneCountQuery = `
SELECT
(SELECT COUNT(*) FROM milestones m WHERE m.isOpened = '0') closedMilestoneCount,
(SELECT COUNT(*) FROM milestones m WHERE m.isOpened = '1') openedMilestoneCount;`

exports.getMilestone = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const milestones=await models.sequelize
      .query(milestoneQuery, {
        type: sequelize.QueryTypes.SELECT,
      });
      const milestoneCount=await models.sequelize
      .query(mileStoneCountQuery, {
        type: sequelize.QueryTypes.SELECT,
      });
      resolve({ success: true, milestoneCount,milestones });
    } catch (e) {
      reject({ error: e });
    }
  });
};

exports.insertMilestone = async (title, description, dueDate) => {
  return new Promise(async (resolve, reject) => {
    try {
      await milestoneModel.create({
        title: title,
        description: description,
        dueDate: dueDate,
      });
      resolve({ success: true });
    } catch (e) {
      reject({ error: e });
    }
  });
};

exports.updateMilestone = async (milestoneId, title, description, dueDate) => {
  return new Promise(async (resolve, reject) => {
    try {
      await milestoneModel.update(
        {
          title: title,
          description: description,
          dueDate: dueDate,
        },
        { where: { id: milestoneId } }
      );
      resolve({ success: true });
    } catch (e) {
      reject({ error: e });
    }
  });
};

exports.deleteMilestone = async (milestoneId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await milestoneModel.destroy({ where: { id: milestoneId } });

      resolve({ success: true });
    } catch (e) {
      reject({ error: e });
    }
  });
};

exports.updateMilestoneStatus = async (milestoneId, newStatus) => {
  return new Promise(async (resolve, reject) => {
    try {
      await milestoneModel.update(
        { isOpened: newStatus },
        { where: { id: milestoneId } }
      );

      resolve({ success: true });
    } catch (e) {
      reject({ error: e });
    }
  });
};
