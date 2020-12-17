'use strict';
const {compare,convert} = require ('../helper/bcrypts')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', 
    [
      {
      email: 'admin2@mail.com',
      password: convert("aa"),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      email: 'user@mail.com',
      password: convert("aa"),
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

  ], {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
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
