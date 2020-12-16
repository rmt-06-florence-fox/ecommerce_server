function errorHandler(err,req,res,next) {

    if(err.status){
        console.log(err,'<<<<<<<<<<<<<<<<<<<')
        res.status(err.status).json({
            msg : err.msg
        })
    }
    else if(err.name == 'SequelizeValidationError' || err.name == 'SequelizeUniqueConstraintError'){

        if(err.errors.length == 1){
            res.status(400).json({
                msg : err.errors[0].message
            })
        }else {
            let message = err.errors.map(element =>{
                return element.message
            })
            res.status(400).json({
                message : message
            })
        }
    }else {
        res.status(500).json({
            message : 'internal server eror'
        })
    }
}


module.exports = errorHandler