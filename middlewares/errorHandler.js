module.exports = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).json({message: err.message})
    } else if (err.name === "SequelizeUniqueConstraintError"  || err.name === "SequelizeValidationError") {
        const errors = err.errors.map(e => {return {message: e.message}})
        res.status(400).json({message: errors[0].message})
    } else if (err.Error === undefined) {
        res.status(400).json(err)
    }
}