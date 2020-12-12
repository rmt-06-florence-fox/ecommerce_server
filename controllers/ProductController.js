const {Product} = require('../models')

class ProductController {
    static async create(req, res) {
        
        try {
            let newProduct = {
                name: req.body.name,
                image_url: req.body.image_url,
                price: req.body.price,
                stock: req.body.stock
            }
            
            const data =  await Product.create(newProduct)
            res.status(201).json(data)
            console.log(data);
        } catch (error) {
            res.status(500).json(error)
            console.log(error);
        } 
    }

    static async readData(req, res) {
        try {
            const data = await Product.findAll({
                order: [['id', 'ASC']]
            })
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    
    static async findData(req, res) {
        try {
            let id = +req.params.id
            const data =  await Product.findByPk(id)
            
            if(!data) {
                // throw({status: 404,
                //         message: "Data not found!"        
                // })
                res.status(404).json({message: "Data not Found!"})
            } else {
                res.status(200).json(data)
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async deleteData(req, res) {
        try {
            const id = +req.params.id
            const data = await Product.destroy({
                where: {
                    id
                }
            })
            if(!data) {
                throw({status: 404,
                    message: "Data not found!"        
                })
            }else {
                res.status(200).json({message: 'Product success to delete'})
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async editData(req, res) {
        try {
            let editedData = {
                name: req.body.name,
                image_url: req.body.image_url,
                price: req.body.price,
                stock: req.body.stock  
            }
            let id = req.params.id
            const data = await Product.update(editedData, {
                where: {
                    id
                },
                returning: true
            })
            if(!data[1].length) {
                throw({status: 404,
                    message: "Data not found!"        
                })
            }else {
                res.status(200).json(data[1][0])
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = ProductController