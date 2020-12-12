const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(request, response, next) {
    const { access_token } = request.headers;
    
    try {
        if(!access_token) {
            throw { name: 'AuthenticationFailed' }
        }else {
            const decoded = verifyToken(access_token);
            const user = await User.findOne({ 
                    where: { email: decoded.email }
            });
            if(!user) {
                throw { name: 'AuthenticationFailed' }
            }else if(user.role != 'admin') {    
                throw { name: 'AuthenticationFailed' }
            }else {
                request.loggedInUser = decoded;
                next();
            }  
        }
    }catch(error) {
        console.log(error);
        next(error);
    }
}

module.exports = authentication;