const route = require("express").Router();
const authentication = require("../middlewares/authentication");
const authorizationAdmin = require("../middlewares/authorizationAdmin");
const ProductController = require("../controllers/ProductController");

route.use(authentication);
route.use(authorizationAdmin);
route.post("/", ProductController.add);
route.get("/:id", ProductController.findByPk);
route.put("/:id", ProductController.put);
route.patch("/:id", ProductController.purchased);
route.delete("/:id", ProductController.delete);

module.exports = route;