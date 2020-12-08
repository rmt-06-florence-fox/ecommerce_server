'use strict';

const { encryptPass } = require('../helper/bcrypt')

const data = require('../admin.json')
data.forEach( element =>{
  element.password = encryptPass(`${element.password}`)
  element['createdAt'] = new Date()
  element['updatedAt'] = new Date()
  
})


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', data, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
