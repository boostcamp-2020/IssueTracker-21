module.exports = {
  up: function (queryInterface, Sequelize) {
    // 시드 데이터를 추가한다.
    return queryInterface.bulkInsert('issuelabels', [
      {
        labelId: 1,
        issueId: 1,
      },
      {
        labelId: 2,
        issueId: 3,
      },
    ], {});
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('issuelabels', null, {});
  },
};