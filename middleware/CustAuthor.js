const { User,Cart }  = require('../models')
const { Op } = require("sequelize")

async function CustAuthorization (req,res,next){
    const userId = req.loginUser.id
    const cartId = req.params.cartId
    console.log('author=====================', userId,cartId)
    try {
        const cust = await User.findOne({
            where : {
                id :userId
            }
        })
        if(cust.role === 'customer'){
            const findCart = await Cart.findOne({
                where: {
                    id:cartId
                }
            })
            console.log('findChart==========',findCart)
            if(findCart){
                const checkAuth = await Cart.findOne({
                    where: {
                        [Op.and]:[
                            {id: cartId},
                            {UserId: userId}
                        ]
                    }
                })
                if(checkAuth){
                    next()
                }else{
                    throw {
                        status: 401,
                        msg: 'unauthorize access'
                    }
                }
            }else {
                throw{
                    status: 404,
                    msg: 'data not found'
                }
            }
        }
    } catch (error) {
        next(error)
    }
}   

module.exports = CustAuthorization