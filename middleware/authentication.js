const { verifyToken } = require ('../helpers/jwt.js')
const {User} = require ("../models")

module.exports = async (req, res, next) => {
    try {
        const {access_token} = req.headers
        if (!access_token) {
            throw {
                status : 401,
                message : "Please Login First"
            }
        } else {
            const decoded = verifyToken(access_token)
            req.dataUser = decoded
            const LoginUser = await User.findOne ({ 
                where : {
                    id : decoded.id
                }
            })
            if ( LoginUser ) {
                next()
            } else {
                throw {
                    status : 404,
                        message : "Please Register First"
                    }
                }
            }
    } catch (error) {
        next (error)
    }
    
}