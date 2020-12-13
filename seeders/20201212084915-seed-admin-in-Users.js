'use strict';
const bcryptjs = require('bcryptjs')
const { hashSync } = bcryptjs 
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
    
    
    // let data = {
    //  email: "admin@mail.com",
    //  password: hashSync("qwerty", 10),
    //  role: "admin",
    //  createdAt: new Date(),
    //  updatedAt: new Date()
    // }

    await queryInterface.bulkInsert('Users', [{
      "email": 'admin@mail.com',
      "role": 'admin',
      "password": hashSync('qwertyuiop', 10),
      "createdAt": new Date(),
      "updatedAt": new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
