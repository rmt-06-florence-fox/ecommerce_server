'use strict';
if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
}
const { genHash } = require ('../helpers/index')

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
      const password = genHash(process.env.ADM_PASS)
      console.log(password)
    await queryInterface.bulkInsert('Users', [{
        username: 'Admin',
        email: 'admin@ecom.com',
        password: password,
        role: 'admin',
        address: 'not provided',
        createdAt: new Date (),
        updatedAt: new Date ()
      }], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', {username: 'Admin'});
  }
};
