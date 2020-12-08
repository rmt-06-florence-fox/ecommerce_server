const { User }  = require('../models')


async function authorization (req,res,next){
    const userId = req.loginUser.id

    try {
        const admin = await User.findOne({
            where : {
                id :userId
            }
        })
        if(admin.role === 'admin'){
            next()
        }
        else {
            throw {
                status : 401,
                msg : 'Unauthorize access'
            }
        }
    } catch (error) {
        next(error)
    }
}   

module.exports = authorization