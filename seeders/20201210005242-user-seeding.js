'use strict';
const { encrypt } = require('../helpers/password')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      email: 'admin@mail.com',
      password: encrypt('123456'),
      role: 'administrator',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      email: 'customer@mail.com',
      password: encrypt('123456'),
      role: 'customer',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
