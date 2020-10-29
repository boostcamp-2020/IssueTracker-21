const milestoneDao = require("../dao/milestoneDao");

exports.getMilestone = async (req, res) => {
  try {
    let milestones = await milestoneDao.getMilestone();
    return res.status(200).json({
      success: true,
      milestones: milestones,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      error: e,
    });
  }
};

exports.insertMilestone = async (req, res) => {
  try {
    let { title, description, dueDate } = req.body;
    await milestoneDao.insertMilestone(title, description, dueDate);
    return res.status(200).json({
      success: true,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      error: e,
    });
  }
};

exports.updateMilestone = async (req, res) => {
  try {
    let { milestoneId, title, description, dueDate } = req.body;
    await milestoneDao.updateMilestone(
      milestoneId,
      title,
      description,
      dueDate
    );
    return res.status(200).json({
      success: true,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      error: e,
    });
  }
};

exports.deleteMilestone = async (req, res) => {
  try {
    let { milestoneId } = req.body;
    await milestoneDao.deleteMilestone(milestoneId);
    return res.status(200).json({
      success: true,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      error: e,
    });
  }
};

exports.updateMilestoneStatus = async (req, res) => {
  try {
    let { milestoneId, newStatus } = req.body;
    await milestoneDao.updateMilestoneStatus(milestoneId, newStatus);
    return res.status(200).json({
      success: true,
      error: e,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      error: e,
    });
  }
};
