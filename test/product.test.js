const request = require('supertest')
const app = require('../app')
const {hash} = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const {sequelize} = require('../models')
const {queryInterface} = sequelize
let access_token 
let productId

beforeAll((done) => {
    queryInterface.bulkInsert('Users', [{
      email: 'sample@mail.com',
      password: hash('1111'),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'test@mail.com',
      password: hash('2222'),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {returning: true})
    .then ((res)=> {
      let data = {
        id: res[0].id,
        email: res[0].email
      }
      access_token = generateToken(data)
      done()
    })
    .catch((error) => {
      done(error)
    })
})

afterAll((done)=>{
    queryInterface.bulkDelete('Products')
    .then (()=> {
      return queryInterface.bulkDelete('Users')
    })
    .then (()=> {
      done()
    })
    .catch((error) => {
      done(error)
    })
})


describe("add success", () => {
    test("testing", (done) => {
      request(app)
      .post('/products')
      .set('access_token', `${access_token}`)
      .send({
        name : 'Sample',
        image_url : 'https://sample_url.jpg',
        price : 1000,
        stock : 10
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        productId = res.body.id
        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty("id", res.body.id)
        expect(res.body).toHaveProperty("name" , 'Sample')
        done()
      })
    })
  })

  describe("fetch success", ()=> {
    test("testing", (done) => {
      request(app)
      .get('/products')
      .set('access_token', `${access_token}`)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        expect(res.status).toBe(200)
        expect(res.body[0]).toHaveProperty("id", res.body[0].id)
        expect(res.body[0]).toHaveProperty("name" , 'Sample')
        expect(res.body[1]).toHaveProperty("id", res.body[1].id)
        expect(res.body[1]).toHaveProperty("stock", 30)
        done()
      })
    })
  })

  describe("fetchById success", ()=> {
    test("testing", (done) => {
      request(app)
      .get(`/products/${productId}`)
      .set('access_token', `${access_token}`)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty("id", res.body.id)
        expect(res.body).toHaveProperty("name" , 'Sample')
        done()
      })
    })
  })


  describe("update success", ()=> {
    test("testing", (done) => {
      request(app)
      .put(`/products/${productId}`)
      .set('access_token', `${access_token}`)
      .send({
        name : 'Testing',
        image_url : 'https://testing_url.jpg',
        price : 40000,
        stock : 20
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty("id", res.body.id)
        expect(res.body).toHaveProperty("name" , 'Testing')
        expect(res.body).toHaveProperty("price", 40000)
        expect(res.body).toHaveProperty("stock", 20)
        done()
      })
    })
  })

  describe("delete success", ()=> {
    test("testing", (done) => {
      request(app)
      .delete(`/products/${productId}`)
      .set('access_token', `${access_token}`)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty("message", `successfully deleted`)
        done()
      })
    })
  })