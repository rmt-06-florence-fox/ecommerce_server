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
     name: 'Terong',
     image_url: 'https://cdn0-production-images-kly.akamaized.net/W7GuOJxbTDMdK1XATZLvEaT110Q=/640x480/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/2852880/original/065089300_1563104216-bhutan-3639572_1920.jpg',
     price: 50000,
     stock: 5,
     createdAt: new Date(),
     updatedAt: new Date ()
    },
    {
      name: 'Terong',
      image_url: 'https://cdn0-production-images-kly.akamaized.net/W7GuOJxbTDMdK1XATZLvEaT110Q=/640x480/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/2852880/original/065089300_1563104216-bhutan-3639572_1920.jpg',
      price: 50000,
      stock: 5,
      createdAt: new Date(),
      updatedAt: new Date ()
     },
     {
      name: 'Mecin',
      image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/6/6/8686976/8686976_29d5b97a-a85a-463d-a510-2a69ea690d90_1080_1080.jpg',
      price: 60000,
      stock: 4,
      createdAt: new Date(),
      updatedAt: new Date ()
     },
     {
      name: 'Balsem',
      image_url: 'https://www.caplang.com/uploads/news/v9LIL/Screen%20Shot%202018-08-29%20at%202.48.18%20PM.png',
      price: 12000,
      stock: 3,
      createdAt: new Date(),
      updatedAt: new Date ()
     },
     {
      name: 'Obeng',
      image_url: 'https://www.jakartanotebook.com/images/products/75/63/23230/1/obeng-set-reparasi-45-in-1-1.jpg',
      price: 9000,
      stock: 5,
      createdAt: new Date(),
      updatedAt: new Date ()
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
    await queryInterface.bulkDelete('Products', null, {})
  }
};
