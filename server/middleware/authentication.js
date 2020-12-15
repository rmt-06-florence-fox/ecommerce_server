const Jwt = require('../helper/jwt')
module.exports = async (req, res, next) => {
    const token = req.headers.access_token
    if (!token) {
        res.status(401).json(`you must login first`)
    }else{
        try {
            const decoded = await Jwt.Verify(token)
            if (!decoded) {
                throw {
                    status: 401,
                    message: `Your Session Is Time Up`
                }
            }else{
                req.loginUser = decoded
                next()
            }
        } catch (error) {
            next(error)
        }
    }
}