const labelModel = require("../models").label;

/* 모든 라벨 가져오기 */

exports.getLabels = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const labelList = await labelModel.findAndCountAll();
      resolve({ labelList });
    } catch (e) {
      reject(e);
    }
  });
};

/* 라벨 추가 */

exports.insertLabel = async ({ name, description, color }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await labelModel.create({
        name,
        description,
        color,
      });
      return resolve();
    } catch (e) {
      return reject(e);
    }
  });
};

/* 라벨 업데이트 */

exports.updateLabel = async ({ labelId, name, description, color }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await labelModel.update(
        {
          name,
          description,
          color,
        },
        { where: { id: labelId } }
      );

      return resolve();
    } catch (e) {
      return reject(e);
    }
  });
};

/* 라벨 삭제 */

exports.deleteLabel = async ({ labelId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await labelModel.destroy({
        where: { id: labelId },
      });

      return resolve();
    } catch (e) {
      return reject(e);
    }
  });
};
