const express = require("express")
const route = express.Router()
const ControllerUser = require("../controllers/userController")
const ControllerProduct = require("../controllers/productController")
const ControllerCategorie = require('../controllers/categorieController')
const ControllerUserProduct = require('../controllers/UserProductController')
const ControllerWishlist = require("../controllers/wishListController")
const authentication = require("../middlewares/authentication")

// endpoint User
route.post("/register", ControllerUser.registerUser)
route.post("/login", ControllerUser.loginUser)
route.get('/categorie', ControllerCategorie.fetAllCategories)
route.get("/products", ControllerProduct.showAllData)

route.use(authentication)

// endpoint Product
route.get("/products/:id", ControllerProduct.getDataById)
route.post("/products", ControllerProduct.createDataProduct)
route.put("/products/:id", ControllerProduct.updateProduct)
route.delete("/products/:id", ControllerProduct.deleteProduct)
// endpoint Category
route.post('/categorie', ControllerCategorie.createCategories)
route.delete('/categorie/:id', ControllerCategorie.deleteCategories)
// endpoint UserProduct
route.get("/userproduct", ControllerUserProduct.showDataUserProduct)
route.post("/userproduct", ControllerUserProduct.addDataUserProduct)
route.delete("/userproduct", ControllerUserProduct.deleteDataUserProduct)
// endpoint Wishlist
route.get("/wishlist", ControllerWishlist.showAllDataWishlist)
route.post("/wishlist", ControllerWishlist.addDataWishlist)
route.delete("/wishlist", ControllerWishlist.deleteDataWishlist)



module.exports = route