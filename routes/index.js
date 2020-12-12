const route = require("express").Router();
const adminRoutes = require("./adminRoutes");
const productRoutes = require("./productRoutes");
const categoryRoutes = require("./categoryRoutes");

route.use("/admin", adminRoutes);
route.use("/products", productRoutes);
route.use("/categories", categoryRoutes);

module.exports = route;