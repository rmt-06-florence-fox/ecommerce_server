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
            req.dataUser = decoded
            
            User.findOne({
                where: {
                    email,
                    id
                }
            })
            .then(data => {
                console.log(data)
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