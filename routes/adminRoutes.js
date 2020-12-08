const route = require("express").Router();
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const AdminController = require("../controllers/AdminController");
const ProductController = require("../controllers/ProductController");

route.post("/login", AdminController.login);

route.use(authentication);

route.use(authorization);
route.post("/products", ProductController.add);
route.get("/products", ProductController.read);

route.use("/products/:id", authorization);
route.get("/products/:id", ProductController.findByPk);
route.put("/products/:id", ProductController.put);
route.delete("/products/:id", ProductController.delete);


module.exports = route;