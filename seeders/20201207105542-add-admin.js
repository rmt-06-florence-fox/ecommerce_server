'use strict';
const Bcrypt = require('../helper/bcrypt')
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
   queryInterface.bulkInsert('Users', [{
    email: `admin@mail.com`,
    password: Bcrypt.hash('admin'),
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    email: `icih@mail.com`,
    password: Bcrypt.hash('icih'),
    role: 'customer',
    createdAt: new Date(),
    updatedAt: new Date()
  }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {})
  }
};
