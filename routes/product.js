const express = require('express')
const route = express.Router()
const {ProductController} = require('../controller')
const authenticationAdmin = require('../middleware/authenticationAdmin')
const authorization = require('../middleware/authorization')

route.use(authenticationAdmin)
route.get('/', ProductController.read)
route.post('/', ProductController.create)
// route.use('/:id', authorization)
route.get('/:id', ProductController.getList)
route.put('/:id', ProductController.update)
route.delete('/:id', ProductController.destroy)

module.exports = route