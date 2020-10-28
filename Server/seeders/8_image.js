module.exports = {
  up: function (queryInterface, Sequelize) {
    // 시드 데이터를 추가한다.
    return queryInterface.bulkInsert('images', [
      {
        issueID: 1,
        imageData: "image test1"
      },
      {
        issueID: 3,
        imageData: "image test2"
      },
    ], {});
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('images', null, {});
  },
};