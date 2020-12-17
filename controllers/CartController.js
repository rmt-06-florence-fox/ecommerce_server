const { Cart, User, Product, Category, Transaction } = require('../models/index')

class CartController {
  static getCart(req, res, next) {
    User.findOne({
      where: {
        id: Number(req.userData.id)
      },
      attributes: { exclude: ['password'] },
      include: [{
        model: Cart,
        attributes: { include: ['id'] },
        order: [['id', 'ASC']],
        include : [{
          model: Product,
          order: [['id', 'ASC']],
          include: [{
            model: Category
          }]
        }]
      }]
    })
      .then(cart => {
        let totalPrice = 0
        cart.Carts.map(el => {
          totalPrice += el.Product.price * el.quantity
        })
        res.status(200).json({ total: totalPrice, payload: cart})
      })
      .catch(err => {
        next(err)
      })
  }

  static add(req, res, next) {
    const payload = {
      UserId: Number(req.userData.id),
      ProductId: Number(req.body.ProductId),
      quantity: 1
    }
    let status = 200;

    Cart.findOne({
      where: {
        ProductId: payload.ProductId
      }
    })
      .then(cart => {
        if (cart) {
          payload.quantity += cart.quantity
          return cart.update(payload, { returning: true })
        } else {
          status = 201
          return Cart.create(payload)
        }
      })
      .then(cart => {
        if(status === 200) {
          res.status(200).json(cart)
        } else {
          res.status(201).json(cart)
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static minus(req, res, next) {
    const id = Number(req.params.id)

    Cart.findOne({
      id,
      UserId: Number(req.userData.id)
    })
      .then(cart => {
        if (cart) {
          if (cart.quantity > 1) {
            const payload = {
              quantity: cart.quantity -= 1
            }
            return cart.update(payload)
          } else {
            next({ name: 'QUANTITY_MIN' })
          }
        } else {
          next({ name: 'NOT_FOUND' })
        }
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        next(err)
      })
  }

  static plus(req, res, next) {
    const id = Number(req.params.id)

    Cart.findOne({
      where: {
        id,
        UserId: Number(req.userData.id)
      },
      include: [{
        model: Product
      }]
    })
      .then(cart => {
        if (cart) {
          if (cart.quantity > 0) {
            if (cart.quantity >= cart.Product.stock) {
              next({ name: 'QUANTITY_MAX'})
            } else {
              const payload = {
                quantity: cart.quantity += 1
              }
              return cart.update(payload, { returning: true })
            }
          } else {
            next({ name: 'QUANTITY_ZERO' })
          }
        } else {
          next({ name: 'NOT_FOUND' })
        }
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        next(err)
      })
  }

  static delete(req, res, next) {
    const id = Number(req.params.id)
    Cart.findOne({
      where: {id}
    })
      .then(cart => {
        if (cart) {
          return cart.destroy()
        } else {
          next({ name: 'NOT_FOUND' })
        }
      })
      .then(() => {
        res.status(200).json("Successfully deleted cart")
      })
      .catch(err => {
        next(err)
      })
  }

  static addTrans(req, res, next) {
    let codeTrans;
    const UserId = Number(req.userData.id)

    User.findOne({
      where: {id: UserId}
    })
      .then(user => {
        if (user) {
          return Cart.findAll({
            where: { UserId },
            include: [Product]
          })
        } else {
          next({ name: 'NOT_FOUND'})
        }
      })
      .then(cart => {
        let updateStock = []
        cart.map(el => {
          updateStock.push(el.Product.update({
            stock: el.Product.stock - el.quantity
          }))
        })
        return Promise.all(updateStock)
      })
      .then(result => {
        return Transaction.findAll()
      })
      .then(transactions => {
        let idTrans = transactions.length
        let dateString = new Date().toLocaleDateString('id-ID')
        let dateTrans = ''
        for(let i = 0; i < dateString.length; i++) {
          if (dateString[i] !== '/') {
            dateTrans += dateString[i]
          }
        }
        let code = (idTrans+1) + dateTrans

        const payload = {
          code,
          name: req.body.name,
          address: req.body.address,
          UserId: req.userData.id,
          products: req.body.products,
          total_price: req.body.total_price
        }
        return Transaction.create(payload)
      })
      .then(result => {
        codeTrans = result.code
        return Cart.destroy({
          where: { UserId }
        })
      })
      .then(() => {
        res.status(201).json({ codeTrans })
      })
      .catch(err => {
        next(err)
      })
  }

  static getTransactionsUser(req, res, next) {
    Transaction.findAll({
      where: { UserId: Number(req.userData.id) }
    })
      .then(transactions => {
        if (transactions) {
          res.status(200).json(transactions)
        } else {
          next({ name: 'NOT_FOUND' })
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static getOneTransaction (req, res, next) {
    const code = Number(req.params.id)

    Transaction.findOne({
      where: {
        code,
        UserId: Number(req.userData.id)
      }
    })
      .then(transaction => {
        if (transaction) {
          res.status(200).json(transaction)
        } else {
          next({ name: 'NOT_FOUND' })
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static deleteTrans(req, res, next) {
    const id = Number(req.params.id)

    Transaction.findOne({
      where: {id}
    })
      .then(transaction => {
        if (transaction) {
          return transaction.destroy
        } else {
          next({ name: 'NOT_FOUND' })
        }
      })
      .then(() => {
        res.status(200).json("Successfully deleted transaction")
      })
      .catch(err => {
        next(err)
      })
  }

  static getTransactions(req, res, next) {

  }
}

module.exports = CartController