const router = require('express').Router()
// const productRouter = require('./productRouter.js')
const UserController = require('../controllers/userController.js')
const ProductController = require('../controllers/productController.js')
const authentication = require('../middlewares/authentication.js')
const authorization = require('../middlewares/authorization.js')

router.post('/login', UserController.login)

router.use(authentication)
router.get('/products', ProductController.listAll)

router.use(authorization)
router.post('/products', ProductController.createProd)
router.put('/products/:id', ProductController.updateProd)
router.delete('/products/:id', ProductController.delProd)


module.exports = router