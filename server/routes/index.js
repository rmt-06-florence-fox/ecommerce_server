const router = require("express").Router();
const routeUser = require("./user");
const routeProduct = require("./product");
const routeCart = require("./cart");
const routeWishList = require("./wishlist");

router.use("/users", routeUser);
router.use("/products", routeProduct);
router.use("/carts", routeCart);
router.use("/wishlist", routeWishList);

module.exports = router;
