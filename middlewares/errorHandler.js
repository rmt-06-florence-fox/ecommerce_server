module.exports = (err, req, res, next) => {
    console.log(err);

    if (err.status) {
        res.status(err.status).json({
            message: err.message
        })
    } else if (err.name === 'SequelizeValidationError') {
        if (err.message.includes('empty')) {
            res.status(400).json({
                message: 'Field cannot be empty. Please fill out all fields!'
            })
        } else if (err.message.includes('negative')) {
            res.status(400).json({
                message: 'Price/stock cannot be negative!'
            })
        } else {
            res.status(400).json({
                message: 'Price/stock only accept number as input!'
            })
        }
    } else {
        res.status(500).json({
            message: 'Internal server error!'
        })
    }
}