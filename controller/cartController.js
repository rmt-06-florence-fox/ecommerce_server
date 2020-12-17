const {User, Product, Cart, sequelize} = require('../models/index')
const transporter = require('../helper/nodemailer')
class CartController{
    static async create(req, res, next) {
        try {
            const cart = await Cart.findOne({where: {
                UserId: +req.loginUser.id,
                ProductId: +req.body.ProductId,
                status: false
            }})
            if (cart) {
                const product = await Product.findByPk(cart.ProductId)
                if (!product) {
                    throw{
                        status: 404,
                        message: 'data not found'
                    }
                }
                const quantity = cart.quantity + 1
                const obj = {
                    UserId: +req.loginUser.id,
                    ProductId: +req.body.ProductId,
                    quantity: quantity
                }
                const newCart = await Cart.update(obj, {
                    where: {
                        UserId: +req.loginUser.id,
                        ProductId: +req.body.ProductId
                    }, returning: true
                })
                console.log(newCart[1][0].dataValues);
                res.status(201).json(newCart[1][0].dataValues)
            }else{
                const id = +req.body.ProductId
                const product = await Product.findByPk(id)
                if (!product) {
                    throw{
                        status: 404,
                        message: 'data not found'
                    }
                }
                const obj = {
                    UserId: +req.loginUser.id,
                    ProductId: +req.body.ProductId,
                    quantity: 1,
                    status: false
                }
                const newCart = await Cart.create(obj)
                res.status(201).json(newCart)
            }
        } catch (error) {
            console.log(error, '<<<<<<<<<<<');
            next(error)
        }
    }
    static async patch(req, res, next){
        const quantity = +req.body.quantity
        try {
            const cart = await Cart.findOne({where: {
                UserId: +req.loginUser.id,
                ProductId: +req.body.ProductId
            }})
            if (!cart) {
                throw{
                    status: 404,
                    message: 'data not found'
                }
            }
            const product = await Product.findByPk(cart.ProductId)
            if (!product) {
                throw{
                    status: 404,
                    message: 'data not found'
                }
            }
            if (quantity + cart.quantity > product.stock) {
                throw {
                    status: 401,
                    message: 'Stock not already yet'
                }
            }else if (quantity + cart.quantity < 0) {
                throw {
                    status: 401,
                    message: 'Quantity cannot 0'
                }
            }else{
                const newQuantity = quantity + cart.quantity
                const newQuantityCart = await Cart.update({quantity: newQuantity}, {where: {
                    UserId: +req.loginUser.id,
                    ProductId: +req.body.ProductId
                }, returning: true})
                const newCart = await Cart.findOne({
                    where: {
                        UserId: +req.loginUser.id
                    },
                    include: [{
                        model: User
                      },
                    {
                        model: Product
                    }]
                })
                res.status(201).json(newCart)
            }
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    static async getAll(req, res, next){
        try {
            const cart = await Cart.findAll({
                where: {
                    UserId: +req.loginUser.id,
                    status: false
                },
                include: [{
                    model: User
                  },
                {
                    model: Product
                }]
            })
            let totalPrice = 0
            cart.forEach(e => {
               totalPrice += e.Product.price * e.quantity
            });
            res.status(200).json({totalPrice, cart})
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    static remove(req, res, next){
        const id = +req.params.cartId
        Cart.findByPk(id)
         .then(value => {
            if (!value) {
                throw {
                    status: 404,
                    message: `data not found`
                }
             }else{
                return Cart.destroy({
                    where: {id : id},
                  })
             }
         })
         .then(value => {
            res.status(201).json(`Cart succes to delete`)
        })
        .catch(error => {
            next(error)
        })
    }
    static async getById(req, res, next){
        try {
            const id = req.params.cartId
            const cart = await Cart.findByPk(id,
                {include: [{
                    model: User
                  },
                {
                    model: Product
                }]})
            if (!cart) {
                throw {
                    status: 404,
                    message: `data not found`
                }
            }else{
                res.status(200).json(cart)
            }
        } catch (error) {
            next(error)
        }
    }
    static async checkout(req, res, next) {
      const t = await sequelize.transaction();
      try {
        const cart = await Cart.findAll({
            where: {
                UserId: +req.loginUser.id,
                status: false
            },
            include: [{
                model: User
              },
            {
                model: Product
            }]
        })
        let arrCart = []
        let errors = []
        cart.forEach(e => {
            if (e.Product.stock - e.quantity >= 0) {
                arrCart.push(Product.update({stock: e.Product.stock - e.quantity},
                    {where: {
                        id: e.ProductId,
                    }, transaction: t, returning: true }))
                arrCart.push(Cart.update({status: true}, {
                    where: {
                        id: e.id
                    }, transaction: t, returning: true
                }))
            } else {
                errors.push('Transaction gagal')
            }
        });
        const action = await Promise.all(arrCart)
        console.log(action, '<<<<<<<');
        if (errors.length != 0) {
            throw {
                status: 400,
                message: 'Transaction gagal'
            }
        }else{
            await t.commit()
            const mailOptions = {
                from: 'jejualanadm@gmail.com',
                to: `${cart[0].User.email}`,
                subject: 'Tagihan Pembayaran',
                text: `Lakukan pembayaran sebesar melalui bank ABC`
            };
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err, '<<<<<<<<<');
                    console.log('Email sent: ' + info.response);
                }
            })
            res.status(200).json(action)
        }
      } catch (error) {
          await t.rollback()
          next(error)
      }
    }
}
module.exports = CartController