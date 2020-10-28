module.exports = {
  up: function (queryInterface, Sequelize) {
    // 시드 데이터를 추가한다.
    return queryInterface.bulkInsert('comments', [
      {
        content: "comment1",
        createdAT: new Date(),
        updatedAT: new Date(),
        authorID: "test1",
        issueID: 1
      },
      {
        content: "comment2",
        createdAT: new Date(),
        updatedAT: new Date(),
        authorID: "test2",
        issueID: 3
      },
    ], {});
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('comments', null, {});
  },
};