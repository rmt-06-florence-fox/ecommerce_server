module.exports = (err, req, res, next)=>{
    console.log('Di error handler');
    console.log(err, '<<< ini di error handler');
    if (err.status){
        res.status(err.status).json({
            message: err.message
        })
    } else if (err.name == 'SequelizeValidationError'){
        const errMsg = err.errors.map(el => {
            return el.message
        })
        res.status(400).json({
            message: errMsg[0]
        })
    }  else {
        res.status(500).json({message: err})
        // res.status(500).json({message: 'Internal server error'})
    }
}