'use strict';
const { hashPassword } = require('../helpers')
const admin= hashPassword("admin")
const admin2 = hashPassword("admin2")
const customer = hashPassword("customer")
const customer2 = hashPassword("customer2")


module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Users', [{
      name: 'Mimin Ganteng',
      email: 'admin@mail.com',
      password: admin,
      role: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Mimin Kocak',
      email: 'admin2@mail.com',
      password: admin2,
      role: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date()

    }, {
      name: 'Customer Budiman',
      email: 'customer@mail.com',
      password: customer,
      role: 'Customer',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Customer Setia',
      email: 'customer2@mail.com',
      password: customer2,
      role: 'Customer',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Users', null, {});

  }
};
