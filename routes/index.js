const routes = require('express').Router()
const productRoutes = require('./productRoutes')
const userRoutes = require('./userRoutes')

routes.get('/', (req,res) =>{
    res.send('hello')
})
routes.use('/',userRoutes)
routes.use('/product',productRoutes)




module.exports = routes