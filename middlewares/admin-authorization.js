module.exports = async (req, res, next) => {
    try {
        if (req.loggedUser.role == 'admin') {
            next ()
        } else {
            throw {status: 400, message: `Access admin only`}
        }
    } catch (err) {
        next(err)
    }
}