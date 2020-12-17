const router = require("express").Router()
const Controller = require("../controllers/Controller")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")

router.post("/register", Controller.register)
router.post("/login", Controller.login)
router.get("/products", Controller.showProductAll)
router.get("/products/:id", Controller.showProductById)

router.use(authentication)
router.post("/carts", Controller.createCart)
router.get("/carts", Controller.showCart)
router.delete("/carts/:id", Controller.deleteCart)
router.put("/carts/:id", Controller.UpdateCart)
router.post("/products", authorization, Controller.addProduct) 
router.put("/products/:id", authorization, Controller.updateProd) 
router.delete("/products/:id", authorization, Controller.deleteProd)

module.exports = router