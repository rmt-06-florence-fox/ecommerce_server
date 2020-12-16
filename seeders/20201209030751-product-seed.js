'use strict';

const data = require('../product.json')
data.forEach( element =>{
  element['createdAt'] = new Date()
  element['updatedAt'] = new Date()
})


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', data, {});

    // await queryInterface.bulkInsert('Products', data, {});
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
    await queryInterface.bulkDelete('Products', null, {});

    // await queryInterface.bulkDelete('Products', null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
