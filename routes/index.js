const router = require("express").Router();
const userRoutes = require("./user");
const productRoutes = require("./product");
const cartRoutes = require("./cart");

router.get(`/`, (req, res) => {
  res.send(`Welcome to ecommerce-cms`);
});

router.use(`/`, userRoutes);
router.use(`/products`, productRoutes);
router.use(`/carts`, cartRoutes);

module.exports = router;
