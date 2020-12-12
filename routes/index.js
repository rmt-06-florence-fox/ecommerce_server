const router = require("express").Router()
const Controller = require("../controllers/Controller")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")

router.post("/login", Controller.login)

router.use(authentication)
router.get("/products", Controller.showProductAll)
router.get("/products/:id", Controller.showProductById)
router.post("/products", authorization, Controller.addProduct) 
router.put("/products/:id", authorization, Controller.updateProd) 
router.delete("/products/:id", authorization, Controller.deleteProd)

module.exports = router