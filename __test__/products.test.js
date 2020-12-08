const request = require("supertest")
const app = require("../app")
const { sequelize } = require("../models")
const { queryInterface } = sequelize
const { signToken } = require("../helpers/jwt")
const bcrypt = require('bcrypt')
let UserId;
let token = ""

beforeAll((done) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync("foobar", salt)
    queryInterface.bulkInsert("Users", [
      {
        email: "foobar@mail.com",
        password: hash,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {returning: true})
    .then(user => {
      UserId = user[0].id
      token = signToken({
        id: UserId,
        email: user[0].email
      })
      done()
    })
  })
  
  afterAll(done => {
    queryInterface.bulkDelete("Products")
    .then(response => {
      done()
    })
    .catch(err => {
      done(err)
    })
    queryInterface.bulkDelete("Users")
    .then(response => {
      done()
    })
    .catch(err => {
      done(err)
    })
  })
  
  describe("Creating products", () => {
    describe("create Products POST /products", () => {
      test("create products with accept body value", (done) => {
        request(app)
          .post("/products")
          .send({stock: 10, name: "ps5", description:"new console from sony", image:"testing", price:8000000})
          .set("access_token", token)
          .end((err, res) => {
            const { body, status } = res
            if(err){
              return done(err)
            }
            expect(status).toBe(201)
            expect(body).toHaveProperty('name', 'ps5')
            expect(body).toHaveProperty('description', 'new console from sony')
            expect(body).toHaveProperty('stock', 10)
            expect(body).toHaveProperty('image', "testing")
            expect(body).toHaveProperty('price', 8000000)
            done() 
          })
      })
    })
    describe("error creating products", () => {
      test("error when there is no token", (done) => {
        request(app)
          .post("/products")
          .send({stock: 10, name: "ps5", description:"new console from sony", image:"testing", price:8000000})
          .end((err, res) => {
            const { body, status } = res
            if(err){
              return done(err)
            }
            expect(status).toBe(401)
            expect(body).toHaveProperty('message', 'please login first')
            done() 
          })
      })
    })
  })