const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { hashPwd } = require('../helpers/passwordhelper')
const { generateToken } = require('../helpers/jwthelper')
const product = require('../routes/productroute')

const passwordTester = 'adminku'
let access_token
let wrong_access_token
let idProduct
let userIdTester
let productTester = {
  name: 'Sayur Kangkung',
  image_url: 'cari di google',
  price: 20000,
  stock: 3,
  createdAt: new Date(),
  updatedAt: new Date()
}
const adminTester = [
  {
    email: 'admin@mail.com',
    password: hashPwd(passwordTester),
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

beforeAll(done => {
  queryInterface.bulkInsert('Users', adminTester, { returning: true })
    .then(user => {
      emailTester = user[0].email
      access_token = generateToken({ id: user[0].id, email: user[0].email, role: user[0].role })
      wrong_access_token = generateToken({ id: 1, email: 'cust@mail.com', role: 'customer' })
      
      return queryInterface.bulkInsert('Products', [productTester], { returning: true })
    })
    .then(product => {
      idProduct = product[0].id
      done()
    })
    .catch(err => done(err))
})

afterAll(done => {
  queryInterface.bulkDelete('Products')
    .then(() => {
      return queryInterface.bulkDelete('Users')
    })
    .then(() => done())
    .catch(err => done(err))
})

describe('POST /products', () => {
  test('Case 1: Success create product', done => {
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send(productTester)
      .end((err, res) => {
        if (err) return done(err)
        const { body, status } = res
        expect(status).toBe(201)
        expect(body).toHaveProperty('name', 'Sayur Kangkung')
        expect(body).toHaveProperty('image_url', 'cari di google')
        expect(body).toHaveProperty('price', 20000)
        expect(body).toHaveProperty('stock', 3)
        done()
      })
  })

  test(`Case 2: Don't have access token`, done => {
    request(app)
      .post('/products')
      .send(productTester)
      .end((err, res) => {
        if (err) return done(err)
        const { body, status } = res
        expect(status).toBe(401)
        expect(body).toHaveProperty('message', 'Please login first')
        done()
      })
  })

  test('Case 3: Wrong access token', done => {
    request(app)
      .post('/products')
      .set('access_token', wrong_access_token)
      .send(productTester)
      .end((err, res) => {
        if (err) return done(err)
        const { body, status } = res
        expect(status).toBe(401)
        expect(body).toHaveProperty('message', 'Unauthorized user')
        done()
      })
  })

  test('Case 4: Bad request; empty field', done => {
    productTester.name = ''
    productTester.price = ''
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send(productTester)
      .end((err, res) => {
        if (err) return done(err)
        const { body, status } = res
        expect(status).toBe(400)
        expect(body).toEqual(expect.arrayContaining([
          { message: `Name can't be empty` },
          { message: `Price can't be empty` }
        ]))
        done()
      })
  })

  test('Case 5: Bad request; stock with negative number', done => {
    productTester.stock = -2
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send(productTester)
      .end((err, res) => {
        if (err) return done(err)
        const { body, status } = res
        expect(status).toBe(400)
        expect(body).toEqual(expect.arrayContaining([{ message: `Stock can't be a negative number` }]))
        done()
      })
  })

  test('Case 6: Bad request; price with negative number', done => {
    productTester.price = -20000
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send(productTester)
      .end((err, res) => {
        if (err) return done(err)
        const { body, status } = res
        expect(status).toBe(400)
        expect(body).toEqual(expect.arrayContaining([{ message: `Price can't be a negative number` }]))
        done()
      })
  })

  test(`Case 7: Bad request; price and stock can't be filled with letter(string)`, done => {
    productTester.price = 'wkwkwk'
    productTester.stock = 'hihihi'
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send(productTester)
      .end((err, res) => {
        if (err) return done(err)
        const { body, status } = res
        expect(status).toBe(400)
        expect(body).toEqual(expect.arrayContaining([
          { message: `Price must be a number` },
          { message: `Stock must be a number` }
        ]))
        done()
      })
  })
})

describe('GET /products', () => {
  test('Case 1: Success get all product', done => {
    request(app)
      .get('/products')
      .end((err, res) => {
        if (err) return done(err)
        const { body, status } = res
        expect(status).toBe(200)
        expect(body).toEqual(expect.arrayContaining([]))
        done()
      })
  })
})

describe('PUT /products/:id', () => {
  test('Case 1: Success update product', done => {
    request(app)
      .put(`/products/${idProduct}`)
      .set('access_token', access_token)
      .send({ name: 'Nama diganti ya', image_url: 'Gambarnya gausah ditanya', price: 30000, stock: 10 })
      .end((err, res) => {
        if (err) return done(err)
        const { body, status } = res
        expect(status).toBe(200)
        expect(body).toHaveProperty('name', 'Nama diganti ya')
        expect(body).toHaveProperty('image_url', 'Gambarnya gausah ditanya')
        expect(body).toHaveProperty('price', 30000)
        expect(body).toHaveProperty('stock', 10)
        done()
      })
  })

  test(`Case 2: Don't have access token`, done => {
    request(app)
      .put(`/products/${idProduct}`)
      .send({ name: 'Nama diganti ya', image_url: 'Gambarnya gausah ditanya', price: 30000, stock: 10 })
      .end((err, res) => {
        if (err) return done(err)
        const { body, status } = res
        expect(status).toBe(401)
        expect(body).toHaveProperty('message', 'Please login first')
        done()
      })
  })

  test('Case 3: Wrong access token', done => {
    request(app)
      .put(`/products/${idProduct}`)
      .set('access_token', wrong_access_token)
      .send({ name: 'Nama diganti ya', image_url: 'Gambarnya gausah ditanya', price: 30000, stock: 10 })
      .end((err, res) => {
        if (err) return done(err)
        const { body, status } = res
        expect(status).toBe(401)
        expect(body).toHaveProperty('message', 'Unauthorized user')
        done()
      })
  })

  test('Case 4: Bad request; stock with negative number', done => {
    request(app)
      .put(`/products/${idProduct}`)
      .set('access_token', access_token)
      .send({ name: 'Nama diganti ya', image_url: 'Gambarnya gausah ditanya', price: 30000, stock: -10 })
      .end((err, res) => {
        if (err) return done(err)
        const { body, status } = res
        expect(status).toBe(400)
        expect(body).toEqual(expect.arrayContaining([{ message: `Stock can't be a negative number` }]))
        done()
      })
  })

  test(`Case 5: Bad request; price and stock can't be filled with letter(string)`, done => {
    request(app)
      .put(`/products/${idProduct}`)
      .set('access_token', access_token)
      .send({ name: 'Nama diganti ya', image_url: 'Gambarnya gausah ditanya', price: 'jiah', stock: 'hahay' })
      .end((err, res) => {
        if (err) return done(err)
        const { body, status } = res
        expect(status).toBe(400)
        expect(body).toEqual(expect.arrayContaining([
          { message: `Price must be a number` },
          { message: `Stock must be a number` }
        ]))
        done()
      })
  })

  test('Case 6: Bad request; price with negative number', done => {
    request(app)
      .put(`/products/${idProduct}`)
      .set('access_token', access_token)
      .send({ name: 'Nama diganti ya', image_url: 'Gambarnya gausah ditanya', price: -30000, stock: 10 })
      .end((err, res) => {
        if (err) return done(err)
        const { body, status } = res
        expect(status).toBe(400)
        expect(body).toEqual(expect.arrayContaining([{ message: `Price can't be a negative number` }]))
        done()
      })
  })
})

describe('DELETE /products/:id', () => {
  test('Case 1: Success delete product', done => {
    request(app)
      .delete(`/products/${idProduct}`)
      .set('access_token', access_token)
      .end((err, res) => {
        if (err) return done(err)
        const { status, body } = res
        expect(status).toBe(200)
        expect(body).toHaveProperty('message', 'Product has been deleted:)')
        done()
      })
  })

  test(`Case 2: Don't have access token`, done => {
    request(app)
      .delete(`/products/${idProduct}`)
      .end((err, res) => {
        if (err) return done(err)
        const { status, body } = res
        expect(status).toBe(401)
        expect(body).toHaveProperty('message', 'Please login first')
        done()
      })
  })

  test('Case 3: Wrong access token', done => {
    request(app)
      .delete(`/products/${idProduct}`)
      .set('access_token', wrong_access_token)
      .end((err, res) => {
        if (err) return done(err)
        const { status, body } = res
        expect(status).toBe(401)
        expect(body).toHaveProperty('message', 'Unauthorized user')
        done()
      })
  })
})