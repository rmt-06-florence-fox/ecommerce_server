'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Banners', 
    [
      {
      title: 'GOT7',
      status: 'available',
      image_url: 'https://i.pinimg.com/originals/5a/27/2b/5a272b3d7d2fdf81edfa0a0dc4576801.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
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

  down:  (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Banners',{}, {})

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
