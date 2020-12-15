const {Cart} = require('../models/index')
module.exports = async (req, res, next) => {
    try {
        let role = req.userLoggedIn.role
        if(role == 'customer'){
            let data = Cart.findOne({
                where:{
                    UserId: req.userLoggedIn.id
                }
            })
            if(data){
                next()
            } else {
                throw({
                    status: 403,
                    message: `you are not authorized`
                })
            }
        } else {
            throw({
                status: 403,
                message: `you are not authorized`
            })
        }
    } catch (err) {
        next(err)
    }  
}