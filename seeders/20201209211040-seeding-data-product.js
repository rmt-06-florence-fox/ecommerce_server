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

    await queryInterface.bulkInsert("Products", [
      {
        name: "Casio Gshock DW-5600BB-1 original",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8kKcRFYKjVBSBvRc2EpUmI3bB2n9gk-X6EWIDqVlGDgDKSUqsy4wkEiRCdNXM1Wtmi-Z7SpOJ&usqp=CAc",
        price: 1119000,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "DW Classic Petite Ashfield",
        image_url: "http://jamtanganwanita.net/wp-content/uploads/2018/05/jam-dw-classic-petite-ashfield.jpg",
        price: 1715000,
        stock: 10,
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

    await queryInterface.bulkDelete("Products", null, {})
  }
};
