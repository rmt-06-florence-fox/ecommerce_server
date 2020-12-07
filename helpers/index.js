const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const salt = bcrypt.genSaltSync(+process.env.SALT);

class Helper {
    static genHash (pass) {
        return bcrypt.hashSync(pass, salt)
    }

    static degenHash (pass, hash) {
        return bcrypt.compareSync(pass, hash)
    }

    static genToken (data) {
        return jwt.sign(data, process.env.SEC_KEY);
    }

    static degenToken (token) {
        return jwt.verify(token, process.env.SEC_KEY)
    }
}

module.exports = Helper