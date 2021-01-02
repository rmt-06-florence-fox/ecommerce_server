module.exports = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).json({
            message: err.message
        })
    } else if (err.name === "SequelizeValidationError") {
        const errors = err.errors.map(el => el.message)
        res.status(400).json({ error: errors })
    } else if (err.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({ 
            message: "Email already taken! Please input another email" 
        });
    } else {
        res.status(500).json({message: err.message})
        console.log(err.message, '<<<<<<<< 500')
    }
}