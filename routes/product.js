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
route.put('/:id', ProductController.update)
route.delete('/:id', ProductController.destroy)

module.exports = route