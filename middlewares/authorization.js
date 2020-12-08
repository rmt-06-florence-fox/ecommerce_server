
async function authorization(req,res,next){
    try {
        if(req.loggedInUser.role != 'admin'){
            throw {
                status: 403,
                message: 'Unauthorized access'
            }
        }else {
            next()
        }
    } catch (err) {
        next(err)
    }
}

module.exports = authorization