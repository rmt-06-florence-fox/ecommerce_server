const { Product, User } = require("../models");

async function authorization(request, response, next) {
    try {
        const data = await User.findByPk(request.loggedInUser.id);
        if(!data) {
            throw { name: 'NotFound' }
        }else if(data.role === 'admin') {
            next();
        }else {
            throw { name: 'Unauthorized' }
        }
    }catch(error) {
        console.log(error);
        next(error);
    }
}

module.exports = authorization;