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
      name: 'Jam Digital',
      createdAt: new Date (),
      updatedAt: new Date ()
      },
      {
        name: 'Jam Analog',
        createdAt: new Date (),
        updatedAt: new Date ()
      },
      {
        name: 'Jam Mekanik',
        createdAt: new Date (),
        updatedAt: new Date ()
      },
      {
        name: 'Jam Baterai',
        createdAt: new Date (),
        updatedAt: new Date ()
      },
      {
        name: 'Jam Pintar',
        createdAt: new Date (),
        updatedAt: new Date ()
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
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
