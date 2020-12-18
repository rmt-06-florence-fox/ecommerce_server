const product = require ('express').Router()
const { ControllerProduct } = require ('../controllers')
const adminAuth = require ('../middlewares/admin-authorization')
const authentication = require ('../middlewares/authentication')

product.get('/', ControllerProduct.get)
product.use(authentication)
product.get('/wishlist', ControllerProduct.getWishList)
product.post('/wishlist/:productId', ControllerProduct.addWishList)
product.delete('/wishlist/:id', ControllerProduct.deleteWishList)
product.use(adminAuth)
product.post('/', ControllerProduct.post)
product.put('/:id', ControllerProduct.put)
product.delete('/:id', ControllerProduct.delete)


module.exports = product