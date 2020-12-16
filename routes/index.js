const router = require("express").Router();
const adminRoutes = require("./adminRoutes");
const productRoutes = require("./productRoutes");

// homepage, fetch data bagian produk
router.get("/", (req, res) => {
  res.send("hi from router");
});

// admin
router.use("/admin", adminRoutes);

// customer
router.post('/register')
router.post('/login')
router.use('/cart', cartRoutes)

// product(cms)
router.use("/products", productRoutes);


module.exports = router;
