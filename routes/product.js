const express = require('express')
const route = express.Router()
const {ProductController} = require('../controller')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

route.get('/', ProductController.read)
route.use(authentication)
route.post('/', ProductController.create)
// route.use('/:id', authorization)
route.get('/:id', ProductController.getList)

module.exports = route