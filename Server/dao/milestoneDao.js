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

exports.getMilestone = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      models.sequelize
      .query(milestoneQuery, {
        type: sequelize.QueryTypes.SELECT,
      })
      .then(function (milestones) {
        resolve({ success: true, milestones });
      });
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
