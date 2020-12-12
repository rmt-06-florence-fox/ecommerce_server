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
   await queryInterface.bulkInsert('Products', [
     {
       name: 'Raket Badminton',
       imageUrl: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/5/6/64426626/64426626_b1047753-c6c6-4023-9ab1-853e9e2d9efc_1200_1000.jpg',
       price: 300000,
       stock: 9,
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
      name: 'Sepatu bola',
      imageUrl: 'https://id-test-11.slatic.net/p/18a06477710b3bbaa5b655b9c35d80ca.jpg',
      price: 500000,
      stock: 19,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Products', null, {});
  }
};
