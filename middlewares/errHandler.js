module.exports = (err, req, res, next) => {
    console.log(err.message)
    if (err.name) {
        if (err.name == 'Error') {
            res.status(500).json({message: err.message})
        } else {
            const errList = []
            err.errors.forEach(el => {
                errList.push(el.message)
            });
            res.status(500).json({errors: errList})
        }
    } else if (err.status) {
        // console.log(err)
        res.status(err.status).json({error: err.message})
    } else {
        res.status(500).json({error: err})
    }
}