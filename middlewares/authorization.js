const { Product } = require("../models/index")

function authorization (req, res, next){
    if (req.loggedInUser.role === "admin"){
        next()
    }
    else {
        next({message: "Sorry, you are not authorized"})
    }
}

module.exports = authorization