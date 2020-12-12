const router = require('express').Router()
const UserControl = require('../controller/user')
const ProductControl = require('../controller/product')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/signin', UserControl.signin)
router.use(authentication)
router.post('/products', ProductControl.create)
router.get('/products', ProductControl.showData)
router.put('/products/:id', authorization, ProductControl.edit)
router.delete('/products/:id', authorization, ProductControl.deleteData)


module.exports = router