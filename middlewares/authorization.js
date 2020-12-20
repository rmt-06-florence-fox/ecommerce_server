const { User } = require("../models")

module.exports = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.loggedInUser.email
            }
        })
        if (!user) {
            throw {
                status: 404,
                message: "user not found - authorization failed"
            }
        } else {
            if (user.role == "admin") {
                console.log("masuk authorized");
                next()
            } else {
                throw {
                    status: 401,
                    message: "sory, you are not authorized to access this page"
                }
            } 
        }
    } catch (err) {
        next(err)
    }
}