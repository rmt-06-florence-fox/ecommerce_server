const { Product, Category, UserProduct, sequelize } = require ('../models')

class ControllerCart {

    static async addToCart (req, res, next) {
        try {
            const result = await sequelize.transaction(async (t) => {

                const checkProductAmount = await Product.findByPk(req.params.id,
                    { transaction: t })

                if (checkProductAmount) {
                    if (checkProductAmount.stock == 0) {
                        throw new Error (`Sorry there's no stock for this product`)
                    }
                    const checkOnCheckout = await UserProduct.findOne({
                        where: {
                            ProductId: checkProductAmount.id,
                            'on_cart': true
                        },
                        attributes: ['id', 'UserId', 'ProductId', 'on_cart', 'amount']
                    }, { transaction: t })

                    if(checkOnCheckout) {
                        console.log(+checkOnCheckout.amount + +req.body.amount)
                        if ((+checkOnCheckout.amount + +req.body.amount) > +checkProductAmount.stock) {
                            throw new Error(`Amount can't be larger than stock`)
                        } else {
                            console.log()
                            const data = {
                                UserId: req.loggedUser.id,
                                ProductId: req.params.id,
                                amount: +checkOnCheckout.amount + +req.body.amount,
                                on_cart: true,
                            }
                            console.log(checkOnCheckout)
                            const newCart = await UserProduct.update(data, {
                                where: {
                                    id: checkOnCheckout.id
                                }
                            }, { transaction: t })
                            return newCart
                        }
                    } else {
                        const data = {
                            UserId: req.loggedUser.id,
                            ProductId: req.params.id,
                            amount: +req.body.amount,
                            on_cart: true,
                        }
                        const newCart = await UserProduct.create(data, {returning: true}, { transaction: t })
                        return newCart
                    }
                } else {
                    throw new Error(`Product doesn't exist`)
                }
              });
            
            res.status(201).json(result)
        } catch (err) {
            next(err)
        }
    }

    static async onCart (req, res, next) {
        try {
            const data = await UserProduct.findAll({
                where: {
                    UserId: req.loggedUser.id,
                    on_cart: true
                },
                attributes: ['id', 'UserId', 'ProductId', 'on_cart', 'amount'],
                include: {model: Product}
            })
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async deleteFromCart (req, res, next) {
        try {
            const data = await UserProduct.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({message: `Successfully deleted from cart`})
        } catch (err) {
            next(err)
        }
    }

    static async checkoutCart (req, res, next) {
        try {

            const result = await sequelize.transaction(async (t) => {
                const check = []
                for (let i = 0; i < req.body.checkout.length; i++) {
                    const { cart, amount } = req.body.checkout[i]
                    const checkProductAmount = await Product.findByPk(cart.Product.id,
                        { transaction: t })
                    check.push(checkProductAmount)
                    if (checkProductAmount.stock < amount) {
                        throw new Error(`Amount can't be larger than stock`)
                        throw ({status: 400, message: `Amount can't be larger than stock`})
                    } else {
                        const updateCart = await UserProduct.update({
                            on_cart: false,
                            amount: amount,
                            bought: true
                        }, {
                            where: {
                                id: cart.id
                            }
                        }, { transaction: t })

                        const updateProduct = await Product.update({
                            stock: +checkProductAmount.stock - +amount
                        }, {
                            where: {
                                id: cart.Product.id
                            }
                        }, { transaction: t })
                        // +checkProductAmount.stock - +amount
                        // return true
                    }
                }
                return true
              });
            // console.log(result)
            res.status(201).json(result)
        } catch (err) {
            next(err)
        }
    }
}


module.exports = ControllerCart