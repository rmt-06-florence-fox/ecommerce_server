const express = require("express")
const route = express.Router()
const ControllerUser = require("../controllers/userController")
const ControllerProduct = require("../controllers/productController")
const authentication = require("../middlewares/authentication")

// route.post("/register", ControllerUser.registerUser)
route.post("/login", ControllerUser.loginUser)

route.use(authentication)
route.get("/products", ControllerProduct.showAllData)
route.get("/products/:id", ControllerProduct.getDataById)
route.post("/products", ControllerProduct.createDataProduct)
route.put("/products/:id", ControllerProduct.updateProduct)
route.delete("/products/:id", ControllerProduct.deleteProduct)

module.exports = route