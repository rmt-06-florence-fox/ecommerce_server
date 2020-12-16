'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Banners', 
    [
      {
      title: 'SALE',
      status: 'available',
      image_url: 'https://cdn1.vectorstock.com/i/1000x1000/96/50/super-sale-banner-template-design-vector-23449650.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'SALE',
      status: 'available',
      image_url: 'https://3c5239fcccdc41677a03-1135555c8dfc8b32dc5b4bc9765d8ae5.ssl.cf1.rackcdn.com/Black-Friday-Sale-Red-4x8in-300dpi-KB-compressor.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'SALE',
      status: 'available',
      image_url: 'https://previews.123rf.com/images/pattarasin/pattarasin1709/pattarasin170900006/85482183-sale-banner-template-design-big-sale-special-offer-end-of-season-special-offer-banner-vector-illustr.jpg',
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
