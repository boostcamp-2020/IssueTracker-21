const labelDao = require("../dao/labelDao");

/* 모든 라벨 가져오기 */

exports.getLabels = async (req, res, next) => {
  try {
    const labelDaoResponse = await labelDao.getLabels();

    return res.status(200).json({
      success: true,
      labels: labelDaoResponse.labelList,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      error: e,
    });
  }
};

/* 라벨 추가 */

exports.insertLabel = async (req, res, next) => {
  try {
    const { name, description, color } = req.body;
    await labelDao.insertLabel({
      name,
      description,
      color,
    });

    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(400).json({
      success: false,
      error: e,
    });
  }
};

/* 라벨 업데이트 */

exports.updateLabel = async (req, res, next) => {
  try {
    const { labelId, name, description, color } = req.body;
    await labelDao.updateLabel({ labelId, name, description, color });

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: e,
    });
  }
};

/* 라벨 삭제 */

exports.deleteLabel = async (req, res, next) => {
  try {
    const { labelId } = req.body;
    await labelDao.deleteLabel({ labelId });

    return res.status(200).json({
      success: true,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e,
    });
  }
};
