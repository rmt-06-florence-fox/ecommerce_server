const {Product} = require ("../models")

module.exports = async (req, res, next) => {
    try {
        if (req.dataUser.role === "admin") {
            next()
        } else {
            throw {
                status : 401,
                msg : "You are not authorize Edited the Product"
            }
        }
    } catch (err) {
        res.status(err.status).json ({
            message : err.message
        })
    }
}