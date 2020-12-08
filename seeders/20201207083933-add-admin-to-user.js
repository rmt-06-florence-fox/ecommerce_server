'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        email: 'admin@mail.com',
        password: bcrypt.hashSync('123456'),
        role: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user@mail.com',
        password: bcrypt.hashSync('123456'),
        role: 'User',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
