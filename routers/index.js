const express = require('express')
const route = express.Router()
const userRoute = require('./user')
const productRoute = require('./product')
const cartRoute = require('./cart')

route.use(userRoute)
route.use('/products',productRoute)
route.use('/carts',cartRoute)


route.all('/:others',(req,res)=>{
    res.status(502).json({message: 'bad gateway'})
})

module.exports = route