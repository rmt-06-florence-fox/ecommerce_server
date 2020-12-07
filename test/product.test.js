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
      access_token = generateToken({ id: user[0].id, email: user[0].email })
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

describe('GET /products', () => {
  test('Case 1: Success get all product', done => {
    request(app)
      .get('/products')
      .end((err, res) => {
        if(err) return done(err)
        const { body, status } = res
        expect(status).toBe(200)
        expect(body).toEqual(expect.arrayContaining([]))
        done()
      })
  })
})

describe('POST /products', () => {
  test('Case 1: Success create product', done => {
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send({ name: nameTester, image_url: imageTester, price: priceTester, stock: stockTester, UserId: userIdTester })
      .end((err, res) => {
        if(err) return done(err)
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
})