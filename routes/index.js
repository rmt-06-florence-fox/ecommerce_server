const router= require('express').Router()
const {UserController}= require('../controllers')
const ProductRoutes= require('./product-routes')


router.post('/login', UserController.login) 
router.post('/register', UserController.register) 

router.use('/products', ProductRoutes )



module.exports=router


