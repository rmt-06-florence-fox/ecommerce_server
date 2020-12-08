const bcrypt = require('bcrypt');


function encryptPass (password){
    return bcrypt.hashSync(password,10)
}

function comparePassword (password,hash){
    return bcrypt.compareSync(password,hash)
}


module.exports = {
    comparePassword,
    encryptPass
}