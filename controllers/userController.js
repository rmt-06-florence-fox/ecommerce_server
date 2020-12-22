const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { loginToken } = require("../helpers/jwt");

class userController{
    static async register(request, response, next) {
        try {
            if(!request.body.email) {
                throw({ name: 'empty email' })
            } else if (!request.body.password) {
                throw({ name: 'empty password' })
            }
            
            const payload = {
                email: request.body.email,
                password: request.body.password,
                role: request.body.role
            }

            const data = await User.create(payload);

            response.status(201).json({
                id: data.id,
                email: data.email,
                role: data.role
            });
        } catch(error) {
            console.log("Error from Register =>", + error);
            next(error);
        }
    }

    static async login(request, response, next) {
        try {
            if(!request.body.email) {
                throw({ name: 'empty email' })
            } else if (!request.body.password) {
                throw({ name: 'empty password' })
            }
            const payload = {
                email: request.body.email,
                password: request.body.password
            }

            console.log(payload.email);
            console.log(payload.password);

            const data = await User.findOne({
                where: {
                    email: payload.email
                }
            });

            if(!data) {
                throw({ name: 'email not found' });
            }if(!comparePassword(payload.password, data.password)) {
                throw({ name: 'password invalid' });
            }else {
                const role = data.role
                const access_token = loginToken({
                    id: data.id,
                    email: data.email
                });
                response.status(200).json({ 
                    message: 'Login Success',
                    access_token: access_token, 
                    role: role 
                });
            }

        } catch(error) {
            console.log("Error from Login =>", + error);
            next(error);
        }
    }
}

module.exports = userController;