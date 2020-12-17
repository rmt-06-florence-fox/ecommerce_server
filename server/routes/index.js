const route = require("express").Router();
const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes");
const categoryRoutes = require("./categoryRoutes");
const cartRoutes = require("./cartRoutes");
const historyRoutes = require("./historyRoutes");
const ProductController = require("../controllers/ProductController");
const CategoryController = require('../controllers/CategoryController');
const HistoryController = require("../controllers/HistoryController");

route.get("/categories", CategoryController.read);
route.get("/products", ProductController.read);

route.use(userRoutes);
route.post("/histories", HistoryController.add);
route.get("/histories", HistoryController.read);
route.use("/products", productRoutes);
route.use("/categories", categoryRoutes);
route.use("/carts", cartRoutes);
route.use("/histories", historyRoutes);


module.exports = route;