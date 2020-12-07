const { Product } = require('../models')

module.exports = (req,res,next) => {
        Todo.findOne({where: {id: req.params.id}})
        .then(data => {
            if(data){
                if (data.UserId == req.loggedInUser.id){
                    next()
                } else {
                    throw {
                        status: 401,
                        message: 'you are not authorize'
                    }
                }
            } else {
                throw {
                    status: 404,
                    message: 'Product not found'
                }
            }
        })
        .catch(error => {
            next(error)
        })
}