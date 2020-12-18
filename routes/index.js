const route = require("express").Router();
const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes");
const categoryRoutes = require("./categoryRoutes");
const cartRoutes = require("./cartRoutes");
const historyRoutes = require("./historyRoutes");
const wishlistRoutes = require("./wishlistRoutes");
const ProductController = require("../controllers/ProductController");
const CategoryController = require('../controllers/CategoryController');

route.get("/categories", CategoryController.read);
route.get("/products", ProductController.read);

route.use(userRoutes);
route.use("/products", productRoutes);
route.use("/categories", categoryRoutes);
route.use("/carts", cartRoutes);
route.use("/histories", historyRoutes);
route.use("/wishlists", wishlistRoutes);

module.exports = route;