const { User } = require('../models/index')

class Authorization {
    static async admin( req, res, next) {
        console.log('sampe error')
        try {
            const user = req.loggedIn
            console.log(user.role)
            if(user.role !== 'admin') {
                throw {name: 'OutOfAuthority'}
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