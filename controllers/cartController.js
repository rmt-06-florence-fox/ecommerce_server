const { Cart, Product } = require('../models')

class cartController {
  // read
  static async get(req, res, next) {
    try {
      const data = await Cart.findAll({
        where: {
					UserId: req.loggedin.id,
					Status: false,
        },
        order: [['createdAt', 'DESC']],
        include: [ Product ]
			})
			let totalPrice = 0
			data.forEach(e => {
				totalPrice += e.quantity * e.Product.price
			})
      res.status(200).json({data, totalPrice})
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  // create
  static async create(req, res, next) {
    try {
      const data = await Cart.findOne({
        where: {
          UserId: req.loggedin.id,
          ProductId: req.body.ProductId
        },
        include: [ Product ]
      })
      if (!data) {
        const data = await Cart.create({
          ProductId: req.body.ProductId,
          UserId: req.loggedin.id,
          quantity: req.body.quantity,
          Status: false,
        })
        res.status(201).json({ Cart: data })
      } else {
        	console.log(data)
					const quantity = data.quantity + +req.body.quantity
					if (data.Product.stock < quantity) {
						throw {
							status: 401,
							message: "lack of stock"
						}
					} else {
						const updatedCart = await Cart.update({
							quantity, 
						}, {
							where: {
								ProductId: req.body.ProductId
							},
							returning: true
						})
						res.status(201).json({ Cart: updatedCart })
					}
				}
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  //update quantity of product in cart
	static async update(req, res, next) {
		try {
			const id = +req.params.id
			const data = await Cart.findOne({
				where: { id },
				include: [Product]
			})

			const currentStock = data.Product.stock
			const quantity = +req.body.quantity

			if(currentStock < quantity) {
				throw { status: 401, message: 'lack of stock' }

			} else if (currentStock >= quantity) {
				const updatedCart = await Cart.update({
					quantity
				}, {
					where: { id },
					returning: true
				})

				res.status(200).json(updatedCart[1][0])
			}

		} catch (err) {
			console.log(err)
			next(err)
		}
	}

	//remove product from the cart
	static async delete(req, res, next) {
		try {
			const id = +req.params.id
			await Cart.destroy({
				where: { id },
				returning: true
			})
			res.status(200).json({ message: 'remove product from cart succeed' })
		} catch (err) {
			next(err)
		}
  }
  
	static async checkout(req, res, next) {
		try {
			const Status = true //checked out
			const carts = await Cart.findAll({
				where: {
					UserId: req.loggedin.id,
					Status: false
				},
				include: [Product]
			})
			carts.map(element => {
				let newStock = element.Product.stock - element.quantity
				Product.update({
					stock: newStock
				}, {
					where: {
						id: element.productId
					}
				})
					.then(() => {
						return element
					})
					.catch(err => {
						console.log(err)
					})
			})
			await Cart.update({
				Status
			}, {
				where: {
					UserId: req.loggedin.id
				}
			})
			res.status(200).json({ message: 'checkout success' })
		} catch (err) {
			next(err)
		}
	}
}

module.exports = cartController