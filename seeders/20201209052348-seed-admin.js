'use strict';
const Helper = require('../helpers/helper.js')

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
   const admin = {
     email: 'admin@mail.com',
     password: Helper.createPassword('admin123'),
     role: 'admin',
     createdAt: new Date(),
     updatedAt: new Date()
   }
   await queryInterface.bulkInsert('Users', admin, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {})
  }
};
