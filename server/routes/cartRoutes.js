const route = require("express").Router();
const CartController = require("../controllers/CartController");
const authentication = require("../middlewares/authentication");
const authorizationCustomer = require("../middlewares/authorizationCustomer");

route.use(authentication);
route.get("/", CartController.read);
route.post("/:ProductId", CartController.add);

route.use("/:id", authorizationCustomer);
route.patch("/:id", CartController.updateQuantity);
route.delete("/:id", CartController.delete);

module.exports = route;