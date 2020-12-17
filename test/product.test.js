const request = require('supertest');
const app = require('../app')
const {User, Product} = require('../models/index')
const {sequelize} = require('../models/index')
const {queryInterface} = sequelize
const {generateToken} = require('../helper/jwt')

let access_token
let objProduct = {
  name: "Adidas Stan Smith",
  image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbqe8PVZ6fDE4NhbHpdgMTQeT-SI2bQ7L2Tw&usqp=CAU",
  price: 500000,
  stock: 5,
  categoryName: 'Sepatu'
}
let objProductId
beforeAll(done => {
  User.findOne({
      where: {
        email: 'admin@mail.com'
      }
    })
    .then(data => {
      access_token = generateToken({
        id: data.id,
        email: data.email,
        role: data.role
      })
      return Product.create(objProduct)
    })
    .then(product => {
      objProductId = product.id
      done()
    })
    .catch(err => {
      done()
    })
})

afterAll(done => {
  try {
    queryInterface.bulkDelete('Products', null)
    done()
  } catch (error) {
    done()
  }
})

describe('Crete Product POST /products', () => {
    describe('Create Product Succes', () => {
      it('Response with data', done => {
        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({
          name: "Adidas Stan Smith",
          image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbqe8PVZ6fDE4NhbHpdgMTQeT-SI2bQ7L2Tw&usqp=CAU",
          price: 500000,
          stock: 5,
          categoryName: 'Sepatu'
        })
        .end((err, res) => {
          const { body, status} = res
          if(err){
            return done(err)
          }
          expect(status).toBe(201)
          expect(body).toHaveProperty('name', 'Adidas Stan Smith')
          expect(body).toHaveProperty('image_url', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbqe8PVZ6fDE4NhbHpdgMTQeT-SI2bQ7L2Tw&usqp=CAU')
          expect(body).toHaveProperty('price', 500000)
          expect(body).toHaveProperty('stock', 5)
          expect(body).toHaveProperty('CategoryId', expect.any(Number))
          done()
        })
      })
    }),
    describe('Create Product Error', () => {
      it('Error without token', done => {
        request(app)
        .post('/products')
        .send({
          name: "Adidas Stan Smith",
          image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbqe8PVZ6fDE4NhbHpdgMTQeT-SI2bQ7L2Tw&usqp=CAU",
          price: 500000,
          stock: 5,
          categoryName: 'Sepatu'
        })
        .end((err, res) => {
          const { body, status} = res
          if(err){
            return done(err)
          }
          expect(status).toBe(401)
          expect(body).toHaveProperty('message', 'You must login first')
          done()
        })
      })
    }),
    describe('Create Product Error', () => {
      it('Error name is empty', done => {
        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({
          image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbqe8PVZ6fDE4NhbHpdgMTQeT-SI2bQ7L2Tw&usqp=CAU",
          price: 500000,
          stock: 5,
          categoryName: 'Sepatu'
        })
        .end((err, res) => {
          const { body, status} = res
          if(err){
            return done(err)
          }
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', expect.any(String))
          done()
        })
      })
    }),
    describe('Create Product Error', () => {
      it('Error image_url is empty', done => {
        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({
          name: "Adidas Stan Smith",
          price: 500000,
          stock: 5,
          categoryName: 'Sepatu'
        })
        .end((err, res) => {
          const { body, status} = res
          if(err){
            return done(err)
          }
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', expect.any(String))
          done()
        })
      })
    }),
    describe('Create Product Error', () => {
      it('Price is empty', done => {
        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({
          name: "Adidas Stan Smith",
          image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbqe8PVZ6fDE4NhbHpdgMTQeT-SI2bQ7L2Tw&usqp=CAU",
          stock: 5,
          categoryName: 'Sepatu'
        })
        .end((err, res) => {
          const { body, status} = res
          if(err){
            return done(err)
          }
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', expect.any(String))
          done()
        })
      }),
      describe('Create Product Error', () => {
        it('price is lower than 1000', done => {
          request(app)
          .post('/products')
          .set('access_token', access_token)
          .send({
            name: "Adidas Stan Smith",
            image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbqe8PVZ6fDE4NhbHpdgMTQeT-SI2bQ7L2Tw&usqp=CAU",
            price: 100,
            stock: 5,
            categoryName: 'Sepatu'
          })
          .end((err, res) => {
            const { body, status} = res
            if(err){
              return done(err)
            }
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', expect.any(String))
            done()
          })
        })
      }),
      describe('Create Product Error', () => {
        it('Stock is empty', done => {
          request(app)
          .post('/products')
          .set('access_token', access_token)
          .send({
            name: "Adidas Stan Smith",
            image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbqe8PVZ6fDE4NhbHpdgMTQeT-SI2bQ7L2Tw&usqp=CAU",
            price: 500000,
            categoryName: 'Sepatu'
          })
          .end((err, res) => {
            const { body, status} = res
            if(err){
              return done(err)
            }
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', expect.any(String))
            done()
          })
        })
      }),
      describe('Create Product Error', () => {
        it('Stock < 0', done => {
          request(app)
          .post('/products')
          .set('access_token', access_token)
          .send({
            name: "Adidas Stan Smith",
            image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbqe8PVZ6fDE4NhbHpdgMTQeT-SI2bQ7L2Tw&usqp=CAU",
            price: 500000,
            stock: -1,
            categoryName: 'Sepatu'
          })
          .end((err, res) => {
            const { body, status} = res
            if(err){
              return done(err)
            }
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', expect.any(String))
            done()
          })
        })
      })
    })
  }),

  describe('Get Product GET /products', () => {
    describe('Get Product Succes', () => {
      it('Response with data', done => {
        request(app)
        .get('/products')
        .set('access_token', access_token)
        .end((err, res) => {
          const { body, status} = res
          console.log(body)
          if(err){
            return done(err)
          }
          expect(status).toBe(200)
          done()
        })
      })
    }),
    describe('Get Product Error', () => {
      it('Error without token', done => {
        request(app)
        .get('/products')
        .end((err, res) => {
          const { body, status} = res
          if(err){
            return done(err)
          }
          expect(status).toBe(401)
          expect(body).toHaveProperty('message', 'You must login first')
          done()
        })
      })
    })
  })
  describe('Get Product By Id GET /products', () => {
    describe('Get Product BProducty Id Succes', () => {
      it('Response with data', done => {
        request(app)
        .get(`/products/${objProductId}`)
        .set('access_token', access_token)
        .end((err, res) => {
          const { body, status} = res
          if(err){
            return done(err)
          }
          expect(status).toBe(200)
          done()
        })
      })
    }),
    describe('Get Product By Id Error', () => {
      it('Error without token', done => {
        request(app)
        .get(`/products/${objProductId}`)
        .end((err, res) => {
          const { body, status} = res
          if(err){
            return done(err)
          }
          expect(status).toBe(401)
          expect(body).toHaveProperty('message', 'You must login first')
          done()
        })
      })
    })
    describe('Get Product By Id Error', () => {
      it('Error id not found', done => {
        request(app)
        .get(`/products/6`)
        .end((err, res) => {
          const { body, status} = res
          if(err){
            return done(err)
          }
          expect(status).toBe(401)
          expect(body).toHaveProperty('message', expect.any(String))
          done()
        })
      })
    })
  })

  describe('Edit Product Put /products', () => {
    describe('Edit Product Succes', () => {
      it('Response with data', done => {
        request(app)
        .put(`/products/${objProductId}`)
        .set('access_token', access_token)
        .send({
          name: "Adidas Stan Smith",
          image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbqe8PVZ6fDE4NhbHpdgMTQeT-SI2bQ7L2Tw&usqp=CAU",
          price: 700000,
          stock: 5,
          categoryName: 'Sepatu'
        })
        .end((err, res) => {
          const { body, status} = res
          if(err){
            return done(err)
          }
          expect(status).toBe(200)
          expect(body).toHaveProperty('name', 'Adidas Stan Smith')
          expect(body).toHaveProperty('image_url', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbqe8PVZ6fDE4NhbHpdgMTQeT-SI2bQ7L2Tw&usqp=CAU')
          expect(body).toHaveProperty('price', 700000)
          expect(body).toHaveProperty('stock', 5)
          expect(body).toHaveProperty('CategoryId', expect.any(Number))
          done()
        })
      })
    }),
    
    describe('Edit Product Error', () => {
      it('Error without token', done => {
        request(app)
        .put(`/products/${objProductId}`)
        .end((err, res) => {
          const { body, status} = res
          if(err){
            return done(err)
          }
          expect(status).toBe(401)
          expect(body).toHaveProperty('message', 'You must login first')
          done()
        })
      })
    }),
    describe('Edit Product Error', () => {
      it('name is empty', done => {
        request(app)
        .put(`/products/${objProductId}`)
        .set('access_token', access_token)
        .send({
          name: '',
          image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbqe8PVZ6fDE4NhbHpdgMTQeT-SI2bQ7L2Tw&usqp=CAU",
          price: 700000,
          stock: 5,
          categoryName: 'Sepatu'
        })
        .end((err, res) => {
          const { body, status} = res
          if(err){
            return done(err)
          }
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', expect.any(String))
          done()
        })
      })
    }),
    describe('Edit Product Error', () => {
      it('image url is empty', done => {
        request(app)
        .put(`/products/${objProductId}`)
        .set('access_token', access_token)
        .send({
          name: "Adidas Stan Smith",
          image_url: '',
          price: 700000,
          stock: 5,
          categoryName: 'Sepatu'
        })
        .end((err, res) => {
          const { body, status} = res
          if(err){
            return done(err)
          }
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', expect.any(String))
          done()
        })
      })
    }),
    describe('Edit Product Error', () => {
      it('Price is empty', done => {
        request(app)
        .put(`/products/${objProductId}`)
        .set('access_token', access_token)
        .send({
          name: "Adidas Stan Smith",
          image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbqe8PVZ6fDE4NhbHpdgMTQeT-SI2bQ7L2Tw&usqp=CAU",
          price: '',
          stock: 5,
          categoryName: 'Sepatu'
        })
        .end((err, res) => {
          const { body, status} = res
          if(err){
            return done(err)
          }
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', expect.any(String))
          done()
        })
      })
    }),
    describe('Edit Product Error', () => {
      it('Price is < 1000', done => {
        request(app)
        .put(`/products/${objProductId}`)
        .set('access_token', access_token)
        .send({
          name: "Adidas Stan Smith",
          image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbqe8PVZ6fDE4NhbHpdgMTQeT-SI2bQ7L2Tw&usqp=CAU",
          price: 100,
          stock: 5,
          categoryName: 'Sepatu'
        })
        .end((err, res) => {
          const { body, status} = res
          if(err){
            return done(err)
          }
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', expect.any(String))
          done()
        })
      })
    }),
    describe('Edit Product Error', () => {
      it('Stock is empty', done => {
        request(app)
        .put(`/products/${objProductId}`)
        .set('access_token', access_token)
        .send({
          name: "Adidas Stan Smith",
          image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbqe8PVZ6fDE4NhbHpdgMTQeT-SI2bQ7L2Tw&usqp=CAU",
          price: 700000,
          stock: '',
          categoryName: 'Sepatu'
        })
        .end((err, res) => {
          const { body, status} = res
          if(err){
            return done(err)
          }
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', expect.any(String))
          done()
        })
      })
    }),
    describe('Edit Product Error', () => {
      it('stock < 0', done => {
        request(app)
        .put(`/products/${objProductId}`)
        .set('access_token', access_token)
        .send({
          name: "Adidas Stan Smith",
          image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbqe8PVZ6fDE4NhbHpdgMTQeT-SI2bQ7L2Tw&usqp=CAU",
          price: 700000,
          stock: -1,
          categoryName: 'Sepatu'
        })
        .end((err, res) => {
          const { body, status} = res
          if(err){
            return done(err)
          }
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', expect.any(String))
          done()
        })
      })
    })
  })

  describe('Edit Product Stock Patch /products', () => {
    describe('Edit Product Error', () => {
      it('Error without token', done => {
        request(app)
        .patch(`/products/${objProductId}`)
        .end((err, res) => {
          const { body, status} = res
          if(err){
            return done(err)
          }
          expect(status).toBe(401)
          expect(body).toHaveProperty('message', 'You must login first')
          done()
        })
      })
    }),
    describe('Edit Product Stock Succes', () => {
      it('Response with data', done => {
        request(app)
        .patch(`/products/${objProductId}`)
        .set('access_token', access_token)
        .send({
          stock: 6
        })
        .end((err, res) => {
          const { body, status} = res
          if(err){
            return done(err)
          }
          expect(status).toBe(200)
          expect(body).toHaveProperty('stock', 6)
          done()
        })
      })
    }),
    describe('Edit Stock Product Error', () => {
      it('Stock is empty', done => {
        request(app)
        .patch(`/products/${objProductId}`)
        .set('access_token', access_token)
        .send({
          stock: ''
        })
        .end((err, res) => {
          const { body, status} = res
          if(err){
            return done(err)
          }
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', expect.any(String))
          done()
        })
      })
    })
  })

  describe('Delete Product Delete /products', () => {
    describe('Delete Product Error', () => {
      it('Delete without token', done => {
        request(app)
        .delete(`/products/${objProductId}`)
        .end((err, res) => {
          const { body, status} = res
          if(err){
            return done(err)
          }
          expect(status).toBe(401)
          expect(body).toHaveProperty('message', 'You must login first')
          done()
        })
      })
    }),
    describe('Delete Product Succes', () => {
      it('Response with data', done => {
        request(app)
        .delete(`/products/${objProductId}`)
        .set('access_token', access_token)
        .end((err, res) => {
          const { body, status} = res
          if(err){
            return done(err)
          }
          expect(status).toBe(200)
          expect(body).toHaveProperty('message','delete success')
          done()
        })
      })
    })
  })