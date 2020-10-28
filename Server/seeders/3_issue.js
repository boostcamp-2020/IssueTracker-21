module.exports = {
  up: function (queryInterface, Sequelize) {
    // 시드 데이터를 추가한다.
    return queryInterface.bulkInsert('issues', [
      
      {
        id: 1,
        title: 'issue1',
        description: 'issue test',
        isOpened: true,
        authorID: 'test1',
        milestoneId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:2,
        title: 'issue2',
        description: 'issue test',
        isOpened: true,
        authorID: 'test2',
        milestoneId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:3,
        title: 'issue3',
        description: 'issue test',
        isOpened: false,
        authorID: 'test2',
        milestoneId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('issues', null, {});
  },
};