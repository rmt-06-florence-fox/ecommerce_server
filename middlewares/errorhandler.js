function errorHandler(err,req,res,next){
    let message = err.message
    let status;
    if(err.status){
        status = err.status
    }else if (message.includes('Validation error: ')){
        message = message.split(': ')[1]
        if(message.includes(',')){
            message = message.split(',')[0]
        }
        status = 400
    }else{
        status = 500
    }
    res.status(status).json({message})
}

module.exports = errorHandler