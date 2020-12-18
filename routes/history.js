const route = require('express').Router()
const {HistoryController} = require('../controllers')
const authCustomer = require('../middlewares/authCustomer')

route.use(authCustomer)
route.get('/', HistoryController.findAllHistories)

module.exports = route