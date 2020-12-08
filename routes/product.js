const express = require('express')
const route = express.Router()
const {ProductController} = require('../controller')

route.post('/', ProductController.create)

module.exports = route