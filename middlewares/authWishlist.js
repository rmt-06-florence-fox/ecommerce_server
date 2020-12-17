const { Wishlist } = require('../models')

module.exports = async (req, res, next) => {
    try {
        const wishlist = await Wishlist.findOne({ where: { id: +req.params.id } })
        if (!wishlist) {
            throw {
                status: 404,
                message: 'Error Not Found'
            }
        } else if (wishlist.UserId === +req.loggedInUser.id) {
            next()
        } else {
            throw {
                status: 401,
                message: 'You are not authorized'
            }
        }
    } catch (error) {
        next(error)
    }
}