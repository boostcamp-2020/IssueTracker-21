module.exports = {
  up: function (queryInterface, Sequelize) {
    // 시드 데이터를 추가한다.
    return queryInterface.bulkInsert('users', [
      {
        id: 'test1',
        password: 'password',
        salt: 'salt1',
        profile: 'profile1'
      },
      {
        id: 'test2',
        password: 'password',
        salt: 'salt2',
        profile: 'profile2'
      },
      {
        id: 'test3',
        password: 'password',
        salt: 'salt3',
        profile: 'profile3'
      },
    ], {});
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  },
};