'use strict';

const {generatePassword} = require('../helpers/bcrypt');

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
      const seed = [
        {
          email: "admin@mail.com",
          password: generatePassword('1234'),
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: "notAdmin@mail.com",
          password: generatePassword('1234'),
          role: 'customer',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
      await queryInterface.bulkInsert('Users', seed, {})
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
