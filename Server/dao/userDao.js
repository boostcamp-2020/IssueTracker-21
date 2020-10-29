const userModel = require("../models").user;

/* 유저 정보 가져오기 */
exports.getUser = async ({ userId }) => {
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
exports.insertUser = async ({ id, password, salt, profile }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await userModel.create({
        id,
        password,
        salt,
        profile,
      });
      return resolve();
    } catch (e) {
      reject(e);
    }
  });
};
