module.exports = (err, req, res, next) => {
    
    console.log(err, '<<err');

    if(err.name == 'SequelizeValidationError'){
        let message = err.errors[0].message
        res.status(400).json({message})
    } else if (err.name == 'JsonWebTokenError'){
        let message = 'Fail to get access'
        res.status(400).json({message})
    } else if (err.name == 'SequelizeDatabaseError'){
        let message = 'Data can not be null'
        res.status(400).json({message})
    } else if (err.name == 'SequelizeUniqueConstraintError'){
        let message = err.errors[0].message
        res.status(400).json({message})
    } else if (err.message){
        res.status(err.status).json({message : err.message})
    } else {
        res.status(500).json(err)
    }    
    
}
