const { User, Product } = require("../models")
const { comparePass } = require("../helpers/hash")
const { generateToken } = require("../helpers/jwt")

class Controller {
    static async register() {

    }
    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            if(!user) {
                console.log("ga ada user");
                throw{
                    status: 401,
                    message: "invalid email or password"
                }
            } else if(comparePass(password, user.password)) {
                const payload = {
                    id: user.id,
                    email: user.email,
                    role: user.role
                }
                const access_token = generateToken(payload)
                res.status(200).json({ access_token, email })
            } else {
                throw{
                    status: 401,
                    message: "invalid email or password"
                }
            }
        } catch (err) {
            next(err)
        }
    }
    static async addProduct(req, res, next) {
        try {
            const { name, image_url, price, stock } = req.body
            const input = { name, image_url, price, stock }
            const product =  await Product.create(input)
            res.status(201).json(product)
        } catch (err) {
            next(err)
        }
    }
    static async showProductAll(req, res, next) {
        try {
            const product = await Product.findAll({
                order: [["id", "ASC"]]
            })
            res.status(200).json(product);
        } catch (err) {
            next(err)
        }
    }
    static async updateProd(req, res, next) {
        try {
            const { name, image_url, price, stock } = req.body
            const input = { name, image_url, price, stock }
            const product = await Product.update(input, {
                where: {
                    id: req.params.id
                },
                returning: true
            })
            res.status(200).json(product[1][0])
        } catch (err) {
            next(err)
        }
    }
    static async deleteProd(req, res, next) {
        try {
            const product = await Product.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({message: `success delete product with id ${req.params.id}`})
        } catch (err) {
            next(err)
        }
    }
    static async showProductById(req, res, next) {
        try {
            const product = await Product.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (product) {
                res.status(200).json(product)
            } else {
                throw{
                    status: 404,
                    message: "not found"
                }
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller