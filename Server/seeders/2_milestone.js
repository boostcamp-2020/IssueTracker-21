module.exports = {
  up: function (queryInterface, Sequelize) {
    // 시드 데이터를 추가한다.
    return queryInterface.bulkInsert('milestones', [
      {
        id: 1,
        title: 'BE',
        description: 'Back End',
        dueDate: '2020-10-28',
        isOpened: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title: 'FE',
        description: 'Front End',
        dueDate: '2020-11-11',
        isOpened: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('milestones', null, {});
  },
};