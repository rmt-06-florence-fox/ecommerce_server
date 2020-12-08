const router= require('express').Router()
const { UserController, ProductController}= require('../controllers')

router.post('/login', UserController.login) 

// router.post('/register') // Customer

// router.post('/products', ProductController.create)
// router.get('/products', ProductController.getAll)
// router.get('/products/:id',ProductController.getById )
// router.patch('/products/:id',ProductController.update)
// router.put('/products/:id',ProductController.edit)
// router.delete('/products/:id', ProductController.delete)


module.exports=router


