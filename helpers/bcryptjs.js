const bcrypt = require('bcryptjs')

let hashPassword = (password) => bcrypt.hashSync(password, +process.env.SALT) // ? string hashed
let comparePassword = (password, hashed) => bcrypt.compareSync(password, hashed) // ? true or false

module.exports = { hashPassword , comparePassword }