'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // bulkInsert(): có thể chèn vào nhiều bản ghi 1 lúc
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password: '123456', //plain text: chưa mã hóa, hash password: đã mã hóa
      firstName: 'Bui Minh',
      lastName: 'Tien',
      address: 'VIET NAM',
      gender: 1,
      roleId: 'R1',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
