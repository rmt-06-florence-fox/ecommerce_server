'use strict';
const { hash } = require('../helpers/bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let dataAdmin = [{
      email: `admin@mail.com`,
      password: hash(`123456`),
      role: `admin`,
      createdAt: new Date(),
      updatedAt: new Date()
    }]
    await queryInterface.bulkInsert(`Users`, dataAdmin)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(`Users`)
  }
};
