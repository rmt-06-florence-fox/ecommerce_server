const route = require('express').Router()
const TransactionController = require('../controllers/TransactionController')
const authentication = require('../middlewares/authentication')
const authorizationCustomer = require('../middlewares/authorizationCustomer')

route.use(authentication)
route.get('/', authorizationCustomer, TransactionController.listTransactions)
route.patch('/', authorizationCustomer, TransactionController.checkoutData)

module.exports = route