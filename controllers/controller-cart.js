const { Product, Category, UserProduct, sequelize } = require ('../models')

class ControllerCart {

    static async addToCart (req, res, next) {
        try {
            const result = await sequelize.transaction(async (t) => {

                const checkProductAmount = await Product.findByPk(req.params.id,
                    { transaction: t })

                if (checkProductAmount) {
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
                            throw ({status: 400, message: `Amount can't be larger than stock`})
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
                    throw ({status: 400, message: `Product doesn't exist`})
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
                    UserId: req.loggedUser.id
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
}


module.exports = ControllerCart