'use strict';
const { generatePw } = require('../middlewares/password')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Users', [{
      email: "admin@mail.com",
      password: generatePw("qwerty"),
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      email: "customer@mail.com",
      password: generatePw("qwertycust"),
      role: "customer",
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
