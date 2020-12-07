const router = require("express").Router();
const routeUser = require("./user");
const routeProduct = require("./product");

router.use("/users", routeUser);
router.use("/products", routeProduct);

module.exports = router;
