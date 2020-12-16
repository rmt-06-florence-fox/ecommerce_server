const cart = require('express').Router()
const cartController = require('../controllers/cartController')

cart.get('/', cartController.get)
cart.post('/', cartController.create)

module.exports = cart