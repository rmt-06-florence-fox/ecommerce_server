const { User } = require("../models/index")
const { verifyToken } = require("../helpers/accesToken")

function authentication(req, res, next) {
    let acces_token = req.headers.acces_token
    try {
        // console.log("masuk ga sih?")
        let decoded = verifyToken(acces_token)
        
        if(!decoded) {
            throw {
                status: 401,
                message: { error: "You must have account" }
            }
        }else {
            let email = decoded.email
            let id = decoded.id
            let role = decoded.role
            User.findOne({
                where: {
                    email,
                    id
                }
            })
            .then(data => {
                req.dataUser = decoded
                next()  
            })
            .catch(err => {
                throw {
                    status: 400,
                    message: "You must have account"
                }
            })
        }
    } 
    catch(err) {
        next(err)
    }
}

module.exports = authentication