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
    },
    {
      name: 'Raket nyamuk',
      imageUrl: 'https://assets.klikindomaret.com/products/20037222/20037222_2.jpg',
      price: 70000,
      stock: 11,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
     name: 'Raket tenis',
     imageUrl: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/5/2/101667485/101667485_a1757bdf-e303-4f02-83f1-8ab757518e69_688_688.jpg',
     price: 1000000,
     stock: 3,
     createdAt: new Date(),
     updatedAt: new Date()
   },
   {
    name: 'Sepatu badminton',
    imageUrl: 'https://cf.shopee.co.id/file/139a7fb882fa562a3fc268a9c45c0465',
    price: 300000,
    stock: 9,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
   name: 'Sepatu futsal',
   imageUrl: 'https://cf.shopee.co.id/file/5fb5f42d8709d6f483bf6b8d6485851f',
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
