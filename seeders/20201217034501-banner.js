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
   await queryInterface.bulkInsert('Banners', [
    {
      title: "Product IT",
      status: true,
      image_url: "https://i.pinimg.com/originals/7f/cf/f9/7fcff9f124abca520fe7da187b75a8e7.jpg",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Keyboard",
      status: true,
      image_url: "https://i.pinimg.com/originals/1c/4a/79/1c4a79bb5d3b8d71ef69e1ba7c5cb755.jpg",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Entah",
      status: true,
      image_url: "https://norfolkcomputersandrepair.files.wordpress.com/2015/01/6197676_orig.jpg",
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Banners', null, {});
  }
};
