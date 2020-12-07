const router = require("express").Router()
const ProductController = require("../controllers/productController")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")

router.use(authentication)
router.get('/', ProductController.list)
router.post('/', authorization, ProductController.add)
router.put('/:id',authorization, ProductController.edit)
router.get('/:id', authorization,ProductController.findOne)
router.patch('/:id',authorization, ProductController.update)
router.delete('/:id', authorization, ProductController.delete)

module.exports = router