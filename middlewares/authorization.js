const { User } = require('../models/index')

class Authorization {
    static async admin( req, res, next) {
        try {
            const user = req.loggedIn
            if(user.role !== 'admin') {
                throw {name: 'not Authorized'}
            }
            else {
                next()
            }
        }
        catch(err) {
            next(err)
        }
    }
}

module.exports = Authorization