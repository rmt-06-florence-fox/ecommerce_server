const { Product } = require('../models');

module.exports = async (req,res,next) => {
    try {
        if (req.params.id) {
            const result = await Product.findOne({
                where: {
                    id: req.params.id
                }
            });
            if (!result) {
                throw {
                    status: 404,
                    message: "product not found"
                }
            } else if (req.loggedInUser.role === "admin") {
                next();
            } else {
                throw {
                    status: 401,
                    message: "not authorized"
                }
            }
        } else {
            if (req.loggedInUser.role === "admin") {
                next();
            } else {
                throw {
                    status: 401,
                    message: "not authorized"
                }
            }
        }

    } catch (err) {
        next(err);
    }
}