const milestoneModel = require("../models").milestone;

exports.getMilestone = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let milestones = await milestoneModel.findAll();
      resolve({ success: true, milestones });
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
