const { User } = require("../models")

module.exports = (req, res, next) => {
    const id = req.LoginUser.id
    User.findOne({
        where: {
            id
        }
    })
        .then(data => {
            if (data.role === "admin") {
                next()
                console.log("masuk")
            } else {
                console.log("masuk eeror")
                next({
                    name: "Not Authorized"
                })
            }
        })
        .catch(err => {
            next(err)
        })

}