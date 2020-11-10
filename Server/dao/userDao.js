const userModel = require("../models").user;

/* 모든 유저 정보 가져오기 */
exports.getAllUsers = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await userModel.findAndCountAll({});

      return resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};

/* 유저 정보 가져오기 */
exports.getUser = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await userModel.findOne({
        where: { id: userId },
      });

      return resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};

/* 유저 생성  */
exports.insertUser = async (id, password, profile) => {
  return new Promise(async (resolve, reject) => {
    try {
      await userModel.create({
        id,
        password,
        salt: "salt",
        profile,
      });
      return resolve({ success: true });
    } catch (e) {
      reject({ success: false, error: e });
    }
  });
};

exports.getProfileById = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const profile = await userModel.findOne({
        attributes: ["profile"],
        where: { id: userId },
      });
      resolve({ success: true, profile });
    } catch (e) {
      console.log(e);
      reject({ success: false, error: e });
    }
  });
};
