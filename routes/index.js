const router = require("express").Router();
const userRoutes = require("./user");
const productRoutes = require("./product");

router.get(`/`, (req, res) => {
  res.send(`Welcome to ecommerce-cms`);
});

router.use(`/`, userRoutes);
router.use(`/products`, productRoutes);

module.exports = router;
