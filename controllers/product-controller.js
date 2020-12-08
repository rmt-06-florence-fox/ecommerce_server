class ProductController {
  static async getProducts(req,res,next){
    res.send("Halo ini Halaman Product")
  }
}
module.exports = ProductController