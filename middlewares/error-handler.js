module.exports = function(err, req, res, next){
    if (err.name === 'SequelizeUniqueConstraintError' || err.name === 'SequelizeValidationError'){
        let arrOfErr = err.errors.map(errItem => {
            return errItem.message
        })

        res.status(400).json({
            status : 400,
            messages : arrOfErr
        })

    } else {
        if(!err.status) err.status = 500
        res.status(err.status).json({
            status : err.status,
            messages : [err.message]
        })
    }
}