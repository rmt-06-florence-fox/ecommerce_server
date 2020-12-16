const { User } = require('../models')

module.exports = (req,res,next) => {
        User.findOne({where: {id: req.loggedInUser.id}})
        .then(data => {
            if(data){
                if (data.status == 'admin'){
                    next()
                } else {
                    throw {
                        status: 401,
                        message: 'you are not authorize'
                    }
                }
            } else {
                throw {
                    status: 401,
                    message: 'you are not authorize'
                }
            }
        })
        .catch(error => {
            next(error)
        })
}