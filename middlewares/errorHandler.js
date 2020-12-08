
module.exports = function(err, req, res, next){
    // console.log( err, "masuk ke sini bro")
    let status = err.status || 500
    console.log(err)
    let msg = err.name || "internal server error"
    if (msg === "SequelizeValidationError"){
        status = 400
        const error = err.errors
        msg = ""
        if (error.length > 1){
            error.forEach(el => {
                msg += `${el.message}, `
            });
        }
        else if(error.length === 1){
            msg = error[0].message
        }
    }
    else if (msg === "SequelizeUniqueConstraintError"){
        status = 400
        msg = "email must be unique"
        // console.log("masuk bro")
    }
    else if (msg === "Authentication Failed"){
        status = 401
        msg = "please login first"
    }
    res.status(status).json({message: msg})
}