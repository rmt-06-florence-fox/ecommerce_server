module.exports = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).json(err.message)
    }else if(err.name == 'SequelizeUniqueConstraintError'){
        res.status(401).json('email has been created')
    }else if(err.name == 'SequelizeValidationError'){
        res.status(401).json(err.errors[0].message)
    }else{
        console.log(err);
        res.status(500).json(`oops sorry, it seems any problem from server`)
    }
}