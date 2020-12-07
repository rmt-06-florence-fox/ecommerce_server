function errorHandler(err,req,res,next){
    let message = err.message
    let status = err.status
    if(!status){
        status = 500
    }
    res.status(status).json({message})
}

module.exports = errorHandler