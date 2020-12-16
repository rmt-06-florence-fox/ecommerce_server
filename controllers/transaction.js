const { Transaction, Product } = require('../models')

class TransactionController {
  static async getTransaction (req, res, next) {
    const UserId = req.loggedIn.id
    
    try {
      const transaction = await Transaction.findOne({
        where: {
          UserId,
          status: 'uncompleted'
        },
        include: [{
          model: Product
        }]
      })
      res.status(200).json({transaction})
    } catch (error) {
      next(error)
    }
  }

  static async history (req, res, next) {
    const UserId = req.loggedIn.id
    
    try {
      const transactions = await Transaction.findAll({
        where: {
          UserId,
          status: 'completed'
        }
      })
      res.status(200).json({transactions})
    } catch (error) {
      next(error)
    }
  }

  static async deleteTransaction (req, res, next) {
    const id = req.params.id
    const UserId = req.loggedIn.id
    
    try {
      const transaction = await Transaction.destroy({
        where: {
          id
        }
      })

      const newtransaction = await Transaction.create({
        status: 'uncompleted',
        history: null,
        total: 0,
        UserId
      })
      res.status(200).json({message: `Cart has been cleared`})
    } catch (error) {
      next(error)
    }
  }

  static async checkout (req, res, next) {
    const id = req.params.id
    const UserId = req.loggedIn.id

    try {
      const transaction = await Transaction.findOne({
        where: {
          id
        },
        include: [{
          model: Product
        }]
      })
      
      if (transaction.Products.length === 0) {
        throw {
          status: 400,
          message: `Cannot checkout empty cart`
        }
      } else {
        if (transaction.UserId != UserId) {
          throw {
            status: 403,
            message: `Cannot checkout others cart`
          }
        } else {
          // ! change into history & make a new transaction
          let history = ''
          let total = 0
          let checkstock = transaction.Products.every(e => e.stock >= e.Cart.quantity) // ? true / false

          if (!checkstock) {

            throw {
              status: 400,
              message: `Cannot checkout if the quantity is more than product(s) stock, please double check your cart and the product(s) stock again`
            }

          } else {

            for (let i = 0; i < transaction.Products.length; i++) {
              const element = transaction.Products[i];
              total += element.Cart.total
              let newStock = +element.stock - +element.Cart.quantity
              const product = await Product.update({
                stock: newStock
              }, {
                where: {
                  id: element.id
                },
                returning: true
              })
  
              if (i === transaction.Products.length - 1) {
                history += `${element.id}/s${element.name}/s${element.Cart.quantity}/s${element.price}`
              } else {
                history += `${element.id}/s${element.name}/s${element.Cart.quantity}/s${element.price}\n`
              }
            }
            
            const payload = {
              status: 'completed',
              history,
              total
            }
            
            const put = await Transaction.update(payload, {
              where: {
                id
              }
            })
  
            const newtransaction = await Transaction.create({
              status: 'uncompleted',
              history: null,
              total: 0,
              UserId
            })
      
            res.status(200).json({message: `Checkout Successfully`})
          }
        }
      }

    } catch (error) {
      next(error)
    }
  }
}

module.exports = TransactionController