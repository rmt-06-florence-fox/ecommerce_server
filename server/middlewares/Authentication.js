const { User } = require("../models")
const { compareToken } = require("../helper/generateToken")

module.exports = (req, res, next) => {
    const { access_token } = req.headers
    if (!access_token) {
        next({
            name: "Login First"
        })
    } else {
        const decoded = compareToken(access_token)
        req.LoginUser = decoded
        // console.log(decoded)
        User.findOne({
            where: {
                id: decoded.id
            }
        })
            .then(data => {
                // console.log(data)
                if (data) {
                    next()
                } else {
                    next({
                        name: "Login First"
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }
}