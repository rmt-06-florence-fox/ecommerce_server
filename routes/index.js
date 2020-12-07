const router = require("express").Router();
const adminRoutes = require("./adminRoutes");
const productRoutes = require("./productRoutes");
const authentication = require("../middlewares/authentication");
const { authorize } = require("../middlewares/authorization");

// homepage, fetch data bagian produk
router.get("/", (req, res) => {
  res.send("hi from router");
});

// admin
router.use("/admin", adminRoutes);

// customer
// router.post('/register')
// router.post('/login')

// product(cms)
router.use(authentication);
router.use(authorize);
router.use("/products", productRoutes);


module.exports = router;
