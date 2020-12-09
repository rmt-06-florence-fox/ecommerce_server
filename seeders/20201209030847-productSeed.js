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
      const productSeed = [
        {
          name: 'Product A',
          image_url: 'Image A',
          price: 1000,
          stock: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Product B',
          image_url: 'Image B',
          price: 500,
          stock: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Product C',
          image_url: 'Image C',
          price: 1500,
          stock: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ]
      await queryInterface.bulkInsert('Products', productSeed, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Products', null, {})
  }
};
