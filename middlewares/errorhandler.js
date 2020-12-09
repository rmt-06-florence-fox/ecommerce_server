function errorHandler(err, req, res, next){
    console.log(err);
    if(err.status === 400){
        res.status(err.status).json({message: err.message})
    } else if (err.status === 401){
        res.status(err.status).json({message: 'You are not authorized'})
    } else if (err.status === 404){
        res.status(err.status).json({message: err.message})
    } else {
        res.status(500).json({message: 'Internal Server Error'})
    }
}

module.exports = {
    errorHandler
}