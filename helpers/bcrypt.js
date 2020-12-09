const bcrypt = require('bcryptjs');

function generatePassword(raw){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(raw, salt);
}

function checkPassword(raw, hash){
    return bcrypt.compareSync(raw, hash);
}

module.exports = {
    generatePassword,
    checkPassword
}