const route = require("express").Router();
const AdminController = require("../controllers/AdminController");

route.post("/login", AdminController.login);

module.exports = route;