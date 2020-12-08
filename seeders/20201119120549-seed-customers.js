'use strict';

const users = require("../data/user.json");
const { hash } = require("../helpers/bcrypt");

for (let i = 0; i < users.length; i++) {
  users[i].password = hash(users[i].password);
  users[i].createdAt = new Date();
  users[i].updatedAt = new Date();
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};