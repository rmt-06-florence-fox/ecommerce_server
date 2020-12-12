const route = require("express").Router();
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const ProductController = require("../controllers/ProductController");

route.use(authentication);
route.get("/", ProductController.read);

route.use(authorization);
route.post("/", ProductController.add);
route.get("/:id", ProductController.findByPk);
route.put("/:id", ProductController.put);
route.delete("/:id", ProductController.delete);

module.exports = route;