const routes = require('express').Router()
const { Router } = require('express')
const {UserController} = require('../controller')


routes.post('/login', UserController.login)
routes.post('/register', UserController.register)

module.exports = routes