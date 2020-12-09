const { User } = require("../models/index")
const { verifyToken } = require("../helpers/accesToken")

function authentication(req, res, next) {
    let acces_token = req.headers.acces_token

    try {
        let decoded = verifyToken(acces_token)
   
        if(!decoded) {
            throw {
                status: 401,
                message: { error: "You must have account" }
            }
        }else {
            let email = decoded.data.email
            let id = decoded.data.id
            let role = decoded.data.role
            console.log(email)
   
            User.findOne({
                where: {
                    email,
                    id
                }
            })
                .then(data => {
                    
                    if(data.role === "admin") {
                        next()
                    }else {
                        throw {
                            status: 400,
                            message: "Forbiden Acces"
                        }
                    }
                })
                .catch(err => {
                   next(err)
                })
        }
    } 
    catch(err) {
        next(err)
    }
}

module.exports = authentication