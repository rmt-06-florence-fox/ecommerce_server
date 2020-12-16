const route = require('express').Router()
const UserProductController = require('../controllers/UserProductController')
const authentication = require('../middlewares/authentication')
const authorizationCustomer = require('../middlewares/authorizationCustomer')

route.use(authentication)
route.get('/', authorizationCustomer, UserProductController.listCart)
route.post('/:productId', authorizationCustomer, UserProductController.addCart)
route.patch('/:productId', authorizationCustomer, UserProductController.editCart)
route.delete('/:id', authorizationCustomer, UserProductController.deleteId)

module.exports = route