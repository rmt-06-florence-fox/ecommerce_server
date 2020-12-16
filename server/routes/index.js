const router = require("express").Router();
const routeUser = require("./user");
const routeProduct = require("./product");
const routeCart = require("./cart");

router.use("/users", routeUser);
router.use("/products", routeProduct);
router.use("/carts", routeCart);

module.exports = router;
