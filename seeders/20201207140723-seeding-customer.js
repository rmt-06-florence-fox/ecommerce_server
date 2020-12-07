'use strict';
const {hashPassword} = require('../helpers/bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        email: "customer@mail.com",
        password: hashPassword("123456"),
        role: "customer",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
