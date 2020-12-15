const { Cart } = require('../models')

function authorization(req,res,next){
    if(req.loggedInUser.role !== 'admin'){
        next({
            status: 403,
            message: 'Unauthorized access'
        })
    }else {
        next()
    }
}

async function authorizationCart(req,res,next){
    try {
        const affectedCart = await Cart.findOne({
            where:{
                id: req.params.cartId,
                UserId: req.loggedInUser.id
            }
        })
        if(affectedCart){
            next()
        }else {
            throw {
                status: 403,
                message: 'Unauthorized access'
            }
        } 
    } catch (err) {
        next(err)
    }
}

module.exports = {
    authorization, authorizationCart
}