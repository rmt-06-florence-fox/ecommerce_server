const route = require("express").Router();
const adminRoutes = require("./adminRoutes");
const productRoutes = require("./productRoutes");
const categoryRoutes = require("./categoryRoutes");
const bannerRoutes = require("./bannerRoutes");

route.use("/admin", adminRoutes);
route.use("/products", productRoutes);
route.use("/categories", categoryRoutes);
route.use("/banners", bannerRoutes);


module.exports = route;