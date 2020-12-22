const {Product} = require ("../models")

module.exports = async (req, res, next) => {
    try {
        if (req.dataUser.role === "admin") {
            next()
        } else {
            throw {
                status : 401,
                message : "You are not authorize Edited the Product"
            }
        }
    } catch (error) {
        next (error)
    }
}