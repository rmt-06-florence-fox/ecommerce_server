"use strict";
const { hashPwd } = require("../helpers/passwordhelper");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const admin = [
      {
        email: "admin@mail.com",
        role: "admin",
        password: hashPwd("adminku"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("Users", admin, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};