const { User, Product, Cart } = require("../models")
const { comparePass } = require("../helpers/hash")
const { generateToken } = require("../helpers/jwt")

class Controller {
    static async register(req, res, next) {
        try {
            const { email, password } = req.body
            const input = { email, password }
            const user = await User.create(input)
            res.status(201).json(user)
        } catch (err) {
            next(err)
        }
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
    static async createCart(req, res, next) {
        try {
            const { ProductId, price } = req.body
            const UserId = req.loggedInUser.id
            let cartUpdate;
            const cart = await Cart.findOne({
                where: {
                    UserId: UserId,
                    ProductId: ProductId
                },
                include: [Product],
                returning: true
            })
            if (cart) {
                const inputQty = cart.quantity + 1
                const totalPrice = price * inputQty
                const inputUpdate = {
                    UserId: cart.UserId,
                    ProductId: cart.ProductId,
                    quantity: inputQty,
                    total: totalPrice
                }
                Cart.update(inputUpdate, {
                    where: {
                        id: cart.id
                    },
                    returning: true
                })
                .then(result => {
                    cartUpdate = result
                    const inputUpdteProduct = {
                        name: cart.Product.name,
                        image_url: cart.Product.image_url,
                        price: cart.Product.price,
                        stock: cart.Product.stock - 1
                    }
                    return Product.update(inputUpdteProduct, {
                        where: {
                            id: cart.ProductId
                        },
                        returning: true
                    })
                })
                .then(data => {
                    res.status(200).json({ cart: cartUpdate[1][0], product: data[1][0] })
                })
                .catch((err) => {
                    next(err)
                });
            } else {
                const input = { UserId, ProductId, quantity: 1, total: price }
                const product = await Product.findOne({
                    where: {
                        id: ProductId,
                    },
                    returning: true
                })
                const UpdteProductCreate = {
                    name: product.name,
                    image_url: product.image_url,
                    price: product.price,
                    stock: product.stock - 1
                }
                const createCart =  await Cart.create(input)
                const prod = await Product.update(UpdteProductCreate, {
                    where: {
                        id: product.id
                    },
                    returning: true
                })
                res.status(201).json({cart: createCart, product: prod[1][0]})
            }
        } catch (err) {
            next(err)
        }
    }
    static async showCart(req, res, next) {
        try {
            const cart = await Cart.findAll({
                where: {
                    UserId: req.loggedInUser.id
                },
                order: [['createdAt', 'ASC']],
                include: [Product],
                returning: true
            })
            res.status(200).json(cart)
        } catch (err) {
            next(err)
        }
    } 
    static async deleteCart(req, res, next) {
        try {
            const cartFind = await Cart.findOne({
                where: {
                    id: req.params.id
                },
                include: [Product],
                returning: true
            })
            const data = {
                name: cartFind.Product.name,
                image_url: cartFind.Product.image_url,
                price: cartFind.Product.price,
                stock: cartFind.Product.stock + cartFind.quantity
            }
            const product = await Product.update(data, {
                where: {
                    id: cartFind.Product.id
                },
                returning: true
            })
            const cart = await Cart.destroy({
                where: {
                    id: req.params.id //card Id
                }
            })
            res.status(200).json({message: `success delete product with id ${req.params.id}`, product: product[1][0]}) 
        } catch (err) {
            next(err)
        }
    }
    static async UpdateCart(req, res, next) {
        try {
            const { ProductId, Price, isPlus } = req.body
            const UserId = req.loggedInUser.id
            let cartUpdate;
            const cart = await Cart.findOne({
                where: {
                    id: req.params.id,
                    UserId: UserId,
                    ProductId: ProductId
                },
                include: [Product],
                returning: true
            })
            if (isPlus == "plus") {
                const inputQty = cart.quantity + 1
                const totalPrice = Price * inputQty
                const inputUpdate = {
                    UserId: cart.UserId,
                    ProductId: cart.ProductId,
                    quantity: inputQty,
                    total: totalPrice
                }
                Cart.update(inputUpdate, {
                    where: {
                        id: cart.id
                    },
                    returning: true
                })
                .then(result => {
                    cartUpdate = result
                    const inputUpdteProduct = {
                        name: cart.Product.name,
                        image_url: cart.Product.image_url,
                        price: cart.Product.price,
                        stock: cart.Product.stock - 1
                    }
                    return Product.update(inputUpdteProduct, {
                        where: {
                            id: cart.ProductId
                        },
                        returning: true
                    })
                })
                .then(data => {
                    res.status(200).json({ cart: cartUpdate[1][0], product: data[1][0] })
                })
                .catch((err) => {
                    next(err)
                });
            } else {
                const inputQty = cart.quantity - 1
                const totalPrice = Price * inputQty
                const inputUpdate = {
                    UserId: cart.UserId,
                    ProductId: cart.ProductId,
                    quantity: inputQty,
                    total: totalPrice
                }
                Cart.update(inputUpdate, {
                    where: {
                        id: cart.id
                    },
                    returning: true
                })
                .then(result => {
                    cartUpdate = result
                    const inputUpdteProduct = {
                        name: cart.Product.name,
                        image_url: cart.Product.image_url,
                        price: cart.Product.price,
                        stock: cart.Product.stock + 1
                    }
                    return Product.update(inputUpdteProduct, {
                        where: {
                            id: cart.ProductId
                        },
                        returning: true
                    })
                })
                .then(data => {
                    res.status(200).json({ cart: cartUpdate[1][0], product: data[1][0] })
                })
                .catch((err) => {
                    next(err)
                });
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller