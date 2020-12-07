'use strict';
const {hashPassword} = require('../helpers/bcrypt')
const admins = [
  {
    email : 'admin@mail.com',
    password : hashPassword('123456'),
    role : 'admin',
    createdAt : new Date(),
    updatedAt : new Date()
  },
  {
    email : 'user@mail.com',
    password : hashPassword('123456'),
    role : 'customer',
    createdAt : new Date(),
    updatedAt : new Date()
  }
]

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
   await queryInterface.bulkInsert('Users', admins, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
