module.exports = (err, req, res, next) => {
    
    // console.log(err);

    if(err.name == 'SequelizeValidationError'){
        let message = err.errors[0].message
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
        console.log(err);
        res.status(501).json(err)
    }    
    
}