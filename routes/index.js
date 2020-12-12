var express = require('express')
const app = require('../app')
var router = express.Router()
const Controller = require('../controllers/controller')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')


router.post('/login', Controller.login)
router.get('/products', Controller.productList)

router.use(authentication)

router.post('/products', authorization, Controller.addProducts)
router.put('/products/:id', authorization, Controller.updateProduct)
router.patch('/products/:id', authorization, Controller.patchProduct)
router.delete('/products/:id', authorization, Controller.deleteProduct)
router.get('/products/:id', authorization, Controller.oneProduct)


module.exports = router