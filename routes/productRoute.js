const router = require ('express').Router()
const productController = require ("../controllers/productController")
const authentication = require ("../middleware/authentication")
const authorization = require ("../middleware/authorization")

router.use (authentication)
router.post ("/", authorization, productController.createProduct)
router.get ("/", productController.readProduct)
router.put ("/:id", authorization, productController.updateProduct)
router.delete ("/:id", authorization, productController.deleteProduct)


module.exports = router