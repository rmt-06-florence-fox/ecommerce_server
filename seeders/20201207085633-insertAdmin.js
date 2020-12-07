'use strict';
const { query } = require('express');
const { hash } = require('../helpers/bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      firstName: 'bima',
      lastName: 'krishna',
      gender: 'male',
      email: 'admin@mail.com',
      password: hash('1234'),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
