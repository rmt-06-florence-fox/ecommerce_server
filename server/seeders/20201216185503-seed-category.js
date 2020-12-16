'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', 
    [
      {
      name: 'LOVE',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'FOOD',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'BEVERAGE',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'MAKEUP',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'SKINCARE',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'KPOP',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ], {})
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
    return queryInterface.bulkDelete('Categories',{}, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
