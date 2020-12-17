const route = require("express").Router();
const AdminController = require("../controllers/AdminController");
const CustomerController = require("../controllers/CustomerController");
const authentication = require("../middlewares/authentication");

route.post("/admin/login", AdminController.login);
route.post("/customer/register", CustomerController.register);
route.post("/customer/login", CustomerController.login);

route.use(authentication);
route.get("/customer/profile", CustomerController.getProfile);

module.exports = route;