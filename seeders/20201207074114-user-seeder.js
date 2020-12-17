'use strict';
const bcrypt = require("bcryptjs")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", [{
      email: 'admin@mail.com',
      password: bcrypt.hashSync('123456', 10),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'customer1@mail.com',
      password: bcrypt.hashSync('123456', 10),
      role: 'customer',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
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
    await queryInterface.bulkDelete("Users", null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
