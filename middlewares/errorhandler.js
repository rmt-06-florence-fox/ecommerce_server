module.exports = (err, req, res, next) => {
    console.log('error handler')
    if (err.status) {
        res.status(err.status).json({
            message: err.message
        })
    } else if (err.name === "SequelizeValidationError") {
        const errors = err.errors.map(el => ({
            message: el.message
        }))
        res.status(400).json(errors)
    } else if (err.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({ 
            message: "Email already taken! Please input another email" 
        });
    } else {
        res.status(500).json({message: err.message})
    }
}