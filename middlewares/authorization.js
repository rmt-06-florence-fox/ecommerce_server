const {Product} = require('../models')

async function authorization(req,res,next){
    let productId = req.params.id
    try {
        let targetProduct = await Product.findOne({
            where:{
                id:productId
            }
        })
        if(productId == targetProduct.UserId){
            next()
        }else{
            throw{
                status: 403,
                message: 'Unauthorized access'
            }
        }
    } catch (err) {
        next(err)
    }
}

module.exports = authorization