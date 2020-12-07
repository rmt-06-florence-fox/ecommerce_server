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
}

module.exports = Helper