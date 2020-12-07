module.exports = (err, req, res, next) => {
    if (err.name) {
        const errList = []
        err.errors.forEach(el => {
            errList.push(el.message)
        });

        res.status(500).json({errors: errList})
    } else if (err.status) {
        res.status(err.status).json({error: err.message})
    } else {
        res.status(500).json({error: err})
    }
}