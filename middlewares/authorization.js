const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

module.exports = async (req, res, next) => {
    try {
        const dataUser = verifyToken(req.headers.access_token)
        const data = await User.findOne({
            where: {
                id: dataUser.id
            }
        })
        if(data.role === "admin") {
            next()
        } else {
            throw {
                status: 401,
                message: "You Are Not Authorized"
            }
        }
    } catch(err) {
        next(err)
    }
}  