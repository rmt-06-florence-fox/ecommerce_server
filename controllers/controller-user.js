const { User } = require ('../models/index')
const { genToken, degenHash } = require ('../helpers')

class ControllerUser {
    static async welcome (req, res, next) {
        try {
            res.send('server is running')
        } catch (err) {
            next(err)
        }
    }

    static async getUser (req, res, next) {
        try {
            const data = await User.findByPk(req.loggedUser.id)
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async login (req, res, next) {
        try {
            if(req.body) {
                const comingUser = await User.findOne({
                    where: {
                        email: req.body.email
                    }
                })
                if(comingUser) {
                    if (degenHash(req.body.password, comingUser.password)) {
                        const access_token = genToken({
                            id: comingUser.id,
                            username: comingUser.username,
                            email: comingUser.email,
                            role: comingUser.role
                        })
                        res.status(200).json({access_token})
                    } else {
                        throw ({
                            status: 400,
                            message: `email / password don't match`
                        })
                    }
                } else {
                    throw ({
                        status: 400,
                        message: `email / password don't match`
                    })
                }
                
            } else {
                throw ({
                    status: 400,
                    message: `email / password don't match`
                })
            }
        } catch (err) {
            next (err)
        }
    }


    static async register (req ,res, next) {
        try {
            const newUser = await User.create (req.body)
            const access_token = genToken ({
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                
            })
            res.status(200).json({access_token})
        } catch (err) {
            next(err)
        }
    }

    static async getAll (req, res, next) {
        try {
            const data = await User.findAll()
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

}

module.exports = ControllerUser