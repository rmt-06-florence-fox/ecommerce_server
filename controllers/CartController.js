const {Cart, Product} = require('../models')

class CartController {
    static readData (req, res) {
        Cart.findAll({
            where: {
                AdminId: req.loggedIn.id 
            },
            include: Product
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
        
    }

    static createData (req, res) {
        let item = {
            AdminId: req.loggedIn.id,
            ProductId: req.params.ProductId,
            status: true,
            quantity: 1
        }
        let currentProduct

        Product.findByPk(req.params.ProductId)
        .then((result) => {
            if (!result) {
                res.status(404).json({message: 'Data not found'})
            } else {
                currentProduct = result
                return Cart.findOne({
                    where: {
                        AdminId: req.loggedIn.id,
                        ProductId: req.params.ProductId,
                        // status: true
                    }
                })
            }
        })
        .then((result2) => { 
            console.log(result2, 'ini result 2');
            
            if (!result2) {
                return Cart.create(item)
            } else {
                let qty = result2.quantity
                if (currentProduct.stock <= qty) {
                    res.status(400).json({message: "Out of stock!"})
                } else {
                    let plusQty = result2.quantity + 1
                    return Cart.update({quantity: plusQty},{
                        where: {
                            id: result2.id
                        },
                        returning: true
                    })
                }
            }
        })
        .then(result3 => {
            console.log(result3, 'udah  diupdateee <<<<<<<<<');
            res.status(201).json(result3)
        })
        .catch((err) => {
            console.log(err, '<<<<<<<<<<<<<');
            res.status(500).json(err)
        });
    }

    static updateData (req, res) {
        let {CartId} = req.params
        let  {quantity} = req.body
    
        Cart.update({quantity}, {
            where:  {
                id: CartId,
            },
            returning: true
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static deleteData (req, res) {
        let ProductId = req.params.ProductId
        Cart.destroy({
            where: {
                AdminId: req.loggedIn.id,
                ProductId
            }
        })
        .then(result => {
            res.status(200).json({message: 'Success to delete!'})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
    } 
}

module.exports = CartController