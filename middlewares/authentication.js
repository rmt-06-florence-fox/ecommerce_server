const { User } = require("../models")
const { verifyToken } = require("../helpers/jwt")

module.exports = async (req, res, next) => {
    try {
        console.log("masuk auten");
        const { access_token } = req.headers
        
        if (!access_token) {
            throw {
                status: 401,
                message: "Please Login or Register First"
            }
        } else {
            const decode = verifyToken(access_token)
            const user = await User.findOne({
                where: {
                    email: decode.email
                }
            })
            if (user){
                req.loggedInUser = {
                    id: decode.id,
                    email: decode.email,
                    role: decode.role
                  }
                console.log("masuk auth auth");
                next()
            } else {
                throw {
                    status: 401,
                    message: "Please Login or Register First"
                }
            }
        }
    } catch (err) {
        next(err)
    }
}