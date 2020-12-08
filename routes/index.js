const route = require("express").Router();
const adminRoutes = require("./adminRoutes");

route.use("/admin", adminRoutes);

module.exports = route;