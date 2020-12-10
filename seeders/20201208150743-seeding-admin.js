'use strict';
const {generatePassword} = require('../helper/helper_password')

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
   queryInterface.bulkInsert('Admins', [
     {
       email: "admin1@gmail.com",
       password: generatePassword('admin'),
       role: 'admin',
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       email: "admin2@gmail.com",
       password: generatePassword('admin'),
       role: 'user',
       createdAt: new Date(),
       updatedAt: new Date()
     },
   ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    queryInterface.bulkDelete('Admins', null, {});
  }
};
