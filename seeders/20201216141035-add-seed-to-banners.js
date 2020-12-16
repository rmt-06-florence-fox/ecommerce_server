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
   await queryInterface.bulkInsert('Banners', [{
    title: "Promo 1212",
    status: 'active',
    imageUrl: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/hair-salon-summer-promo-banner-design-template-528ff4abd3f1db406d83eab50d1f7994_screen.jpg?ts=1561539295",
    createdAt: new Date(),
    updatedAt: new Date()
   },
   {
    title: "Promo 1111",
    status: 'active',
    imageUrl: "https://image.shutterstock.com/image-vector/brush-sale-banner-promotion-ribbon-260nw-1182942766.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
   },
   {
    title: "Promo 1010",
    status: 'active',
    imageUrl: "https://suneducationgroup.com/wp-content/uploads/2019/11/WEB-BANNER-YEAR-END-PROMO-SUN-ENGLISH-2019-Copy-1.jpg",
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
    await queryInterface.bulkDelete('Banners', null, {});
  }
};
