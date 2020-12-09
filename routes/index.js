const router= require('express').Router()
const {UserController}= require('../controllers')
const ProductRoutes= require('./product-routes')
const {Authentication} = require('../middlewares')

router.post('/login', UserController.login) 
// router.post('/register') // Customer

router.use(Authentication)
router.use('/products', ProductRoutes )



module.exports=router


