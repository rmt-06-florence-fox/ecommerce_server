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
      // req.transaction = transaction.id
      res.status(200).json({transaction})
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
      // req.transaction = newtransaction.id
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
          // let history = ''
          // for (let i = 0; i < transaction.Products.length; i++) {
          //   const element = transaction.Products[i];
          //   history += `${element.price}[]`
          // }
          // const payload = {
          //   status: 'completed',
          //   history
          // }
          // const put = await Transaction.update(payload, {
          //   where: {
          //     id
          //   }
          // })

          // const newtransaction = await Transaction.create({
          //   status: 'uncompleted',
          //   history: null,
          //   total: 0,
          //   UserId
          // })
          // req.transaction = newtransaction.id
    
          res.status(200).json({message: `Checkout Success`})
        }
      }

    } catch (error) {
      next(error)
    }
  }
}

module.exports = TransactionController