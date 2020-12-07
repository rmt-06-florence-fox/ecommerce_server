module.exports = async (req, res, next) => {
    if (req.loggedUser.role == 'admin') {
            next ()
    } else {
        throw {status: 400, message: `Access admin only`}
    }
}