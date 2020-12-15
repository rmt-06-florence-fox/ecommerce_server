const express = require("express")
const route = express.Router()
const ControllerUser = require("../controllers/userController")
const ControllerProduct = require("../controllers/productController")
const authentication = require("../middlewares/authentication")
const ControllerCategorie = require('../controllers/categorieController')

route.post("/register", ControllerUser.registerUser)
route.post("/login", ControllerUser.loginUser)
route.get('/categorie', ControllerCategorie.fetAllCategories)
route.get("/products", ControllerProduct.showAllData)

route.use(authentication)
route.get("/products/:id", ControllerProduct.getDataById)
route.post("/products", ControllerProduct.createDataProduct)
route.put("/products/:id", ControllerProduct.updateProduct)
route.delete("/products/:id", ControllerProduct.deleteProduct)
route.post('/categorie', ControllerCategorie.createCategories)
route.delete('/categorie/:id', ControllerCategorie.deleteCategories)

module.exports = route