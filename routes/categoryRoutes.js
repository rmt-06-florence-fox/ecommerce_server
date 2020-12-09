const route = require("express").Router();
const CategoryController = require("../controllers/CategoryController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

route.use(authentication);
route.get("/", CategoryController.read);

route.use(authorization);
route.post("/", CategoryController.add);
route.get("/:id", CategoryController.findByPk);
route.put("/:id", CategoryController.put);
route.delete("/:id", CategoryController.delete);

module.exports = route;