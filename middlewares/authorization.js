function authorization (req, res, next) {
    let userRole = req.dataUser.role
    // console.log(userRole, "-----")

    if(userRole !== 'admin') {
        throw {
            message: "You don't have authorization"
        }
    } else {
        next()
    }
}

module.exports = authorization