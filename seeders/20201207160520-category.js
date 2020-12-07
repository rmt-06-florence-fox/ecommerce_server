'use strict';

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
   await queryInterface.bulkInsert('Categories', [
     {
       name: "Toys",
       image: "gamepad",
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       name: "Clothes",
       image: "tshirt",
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       name: "Otomotif",
       image: "motorcycle",
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       name: "Stationary",
       image: "pencil-ruler",
       createdAt: new Date(),
       updatedAt: new Date()
     }
   ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Categories',null, {})
  }
};
