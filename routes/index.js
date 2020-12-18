const express = require("express")
const route = express.Router()
const ControllerUser = require("../controllers/userController")
const ControllerProduct = require("../controllers/productController")
const ControllerCategorie = require('../controllers/categorieController')
const ControllerUserProduct = require('../controllers/UserProductController')
const ControllerWishlist = require("../controllers/wishListController")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")

// endpoint User
route.post("/register/admin", ControllerUser.registerAdmin)
route.post("/register/customer", ControllerUser.registerCustomer)
route.post("/login/customer", ControllerUser.loginCustomer)
route.post("/login/admin", ControllerUser.loginAdmin)
route.get('/categorie', ControllerCategorie.fetchAllCategories)
route.get("/products", ControllerProduct.showAllData)

route.use(authentication)

// endpoint Product
route.get("/products/:id", ControllerProduct.getDataById)
route.post("/products", authorization, ControllerProduct.createDataProduct)
route.put("/products/:id", authorization, ControllerProduct.updateProduct)
route.delete("/products/:id", authorization, ControllerProduct.deleteProduct)
// endpoint Category
route.post('/categorie', authorization, ControllerCategorie.createCategories)
route.delete('/categorie/:id', authorization, ControllerCategorie.deleteCategories)
// endpoint UserProduct
route.get("/userproduct", ControllerUserProduct.showDataUserProduct)
route.post("/userproduct/:productId", ControllerUserProduct.addDataUserProduct)
route.patch("/userproduct/increment/:productId", ControllerUserProduct.incrementQuantityDataUserProduct)
route.patch("/userproduct/decrement/:productId", ControllerUserProduct.decrementQuantityDataUserProduct)
route.delete("/userproduct/:productId", ControllerUserProduct.deleteDataUserProduct)
route.get("/history", ControllerUserProduct.history)
// endpoint Wishlist
route.get("/wishlist", ControllerWishlist.showAllDataWishlist)
route.post("/wishlist", ControllerWishlist.addDataWishlist)
route.delete("/wishlist/:id", ControllerWishlist.deleteDataWishlist)
// checkout 
route.patch("/checkout", ControllerUserProduct.checkout)

module.exports = route