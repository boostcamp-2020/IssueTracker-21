module.exports = {
  up: function (queryInterface, Sequelize) {
    // 시드 데이터를 추가한다.
    return queryInterface.bulkInsert('labels', [
      
      {
        id:1,
        name: 'label1',
        description: 'label tes1',
        color: '#012334'
      },
      {
        id:2,
        name: 'label1',
        description: 'label test2',
        color: '#FEFEDF'
      },
      {
        id:3,
        name: 'label1',
        description: 'label test3',
        color: '#DJSDFN'
      },
    ], {});
  },
    down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('labels', null, {});
  },
};