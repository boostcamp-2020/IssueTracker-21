module.exports = {
  up: function (queryInterface, Sequelize) {
    // 시드 데이터를 추가한다.
    const issueList = [];

    for (let i = 0; i < 27; i++) {
      issueList.push({
        id: i + 4,
        title: `issue ${i+4}`,
        description: 'issue test',
        isOpened: i%2? true: false,
        authorID: `test${ i%3 + 1 }`,
        lastStatusChanger: `test${ i%3 + 1 }`,
        milestoneId: i%2 + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert('issues', [
      
      {
        id: 1,
        title: 'issue1',
        description: 'issue test',
        isOpened: true,
        authorID: 'test1',
        lastStatusChanger: 'test1',
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
        lastStatusChanger: 'test2',
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
        lastStatusChanger: 'test1',
        milestoneId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      ...issueList,
    ], {});
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('issues', null, {});
  },
};