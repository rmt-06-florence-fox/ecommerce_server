'use strict';

const {hashPassword} = require('../helpers/bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'mahdi@mail.com',
          password: hashPassword('mahdi@mail.com'),
          role: 'Admin',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'test@mail.com',
          password: hashPassword('test@mail.com'),
          role: 'Customer',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
