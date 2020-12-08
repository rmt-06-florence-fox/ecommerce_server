const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { hashPwd } = require('../helpers/passwordhelper')
const { generateToken } = require('../helpers/jwthelper')

const passwordTester = 'adminku'
const nameTester = 'Sayur Kangkung'
const imageTester = 'cari di google'
const priceTester = 20000
const stockTester = 3
let access_token
let wrong_access_token
let userIdTester

beforeAll(done => {
  const adminTester = [
    {
      email: 'admin@mail.com',
      password: hashPwd(passwordTester),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]
  queryInterface.bulkInsert('Users', adminTester, { returning: true })
    .then(user => {
      emailTester = user[0].email
      userIdTester = user[0].id
      access_token = generateToken({ id: user[0].id, email: user[0].email, role: user[0].role })
      wrong_access_token = generateToken({ id: 1, email: 'cust@mail.com', role: 'customer' })
      const productTester = [
        {
          name: nameTester,
          image_url: imageTester,
          price: priceTester,
          stock: stockTester,
          UserId: userIdTester,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
      return queryInterface.bulkInsert('Products', productTester, { returning: true })
    })
    .then(() => {
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
      .send({ name: nameTester, image_url: imageTester, price: priceTester, stock: stockTester, UserId: userIdTester })
      .end((err, res) => {
        if (err) return done(err)
        const { body, status } = res
        expect(status).toBe(201)
        expect(body).toHaveProperty('name', nameTester)
        expect(body).toHaveProperty('image_url', imageTester)
        expect(body).toHaveProperty('price', priceTester)
        expect(body).toHaveProperty('stock', stockTester)
        expect(body).toHaveProperty('UserId', userIdTester)
        done()
      })
  })

  test('Case 2: Wrong access token', done => {
    request(app)
      .post('/products')
      .set('access_token', wrong_access_token)
      .send({ name: nameTester, image_url: imageTester, price: priceTester, stock: stockTester, UserId: userIdTester })
      .end((err, res) => {
        if (err) return done(err)
        const { body, status } = res
        expect(status).toBe(401)
        expect(body).toHaveProperty('message', 'Unauthorized user')
        done()
      })
  })

  test('Case 3: Bad request; empty field', done => {
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send({ name: '', image_url: imageTester, price: '', stock: stockTester, UserId: userIdTester })
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

  test('Case 4: Bad request; stock with negative number', done => {
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send({ name: nameTester, image_url: imageTester, price: priceTester, stock: -2, UserId: userIdTester })
      .end((err, res) => {
        if (err) return done(err)
        const { body, status } = res
        expect(status).toBe(400)
        expect(body).toEqual(expect.arrayContaining([{ message: `Stock can't be negative number` }]))
        done()
      })
  })

  test('Case 5: Bad request; price with negative number', done => {
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send({ name: nameTester, image_url: imageTester, price: -20000, stock: stockTester, UserId: userIdTester })
      .end((err, res) => {
        if (err) return done(err)
        const { body, status } = res
        expect(status).toBe(400)
        expect(body).toEqual(expect.arrayContaining([{ message: `Price can't be negative number` }]))
        done()
      })
  })

  test(`Case 6: Bad request; price and stock can't be filled with letter(string)`, done => {
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send({ name: nameTester, image_url: imageTester, price: 'wkwkwk', stock: 'hihihi', UserId: userIdTester })
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