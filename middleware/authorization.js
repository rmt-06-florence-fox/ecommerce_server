module.exports = async (req, res, next) => {
    try {
        let role = req.userLoggedIn.role
        if(!role){
            throw({
                status: 403,
                message: `you are not authorized`
            })
        } else {
            if(role == 'admin'){
                next()
            } else {
                throw({
                    status: 403,
                    message: `you are not authorized`
                })
            }
        }
    } catch (err) {
        next(err)
    }  
}