
function authorization(req,res,next){
    if(req.loggedInUser.role !== 'admin'){
        next({
            status: 403,
            message: 'Unauthorized access'
        })
    }else {
        next()
    }
}

module.exports = authorization