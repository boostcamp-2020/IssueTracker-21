module.exports = {
  up: function (queryInterface, Sequelize) {
    // 시드 데이터를 추가한다.
    return queryInterface.bulkInsert('assignees', [
      {
        userID: 'test1',
        issueID: 1,
      },
      {
        userID: 'test2',
        issueID: 2,
      },
    ], {});
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('assignees', null, {});
  },
};