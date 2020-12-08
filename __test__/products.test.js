const request = require("supertest")
const app = require("../app")
const { sequelize } = require("../models")
const { queryInterface } = sequelize
const { signToken } = require("../helpers/jwt")
const bcrypt = require('bcrypt')
let UserId;
let token = ""
let ProductId;
let RandomId = Math.floor(Math.random() * 10)

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
  queryInterface.bulkInsert("Products", [
    {
      name: "ps5",
      description: "new sony console",
      image: "testing",
      stock: 10,
      price: 8000000,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ], {returning: true})
  .then(product => {
    ProductId = product[0].id
    done()
  })
  .catch(err => {
    console.log(err)
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
describe("Getting products", () => {
  describe("get products GET /products", () =>{
    test("get products", (done) => {
      request(app)
        .get("/products")
        .end((err, res) => {
          const { body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(200)
          expect(body[0]).toHaveProperty('name' , expect.any(String))
          expect(body[0]).toHaveProperty('description' , expect.any(String))
          expect(body[0]).toHaveProperty('stock' , expect.any(Number))
          expect(body[0]).toHaveProperty('image', expect.any(String))
          expect(body[0]).toHaveProperty('price', expect.any(Number))
          done() 
        })
    })
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
      test("error when there is no stock", (done) => {
        request(app)
          .post("/products")
          .set("access_token", token)
          .send({name: "ps5", description:"new console from sony", image:"testing", price:8000000})
          .end((err, res) => {
            const { body, status } = res
            if(err){
              return done(err)
            }
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', 'Stock is required!')
            done() 
          })
      })
      test("error when there is no name", (done) => {
        request(app)
          .post("/products")
          .send({stock: 10, description:"new console from sony", image:"testing", price:8000000})
          .set("access_token", token)
          .end((err, res) => {
            const { body, status } = res
            if(err){
              return done(err)
            }
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', 'Product Name is required!')
            done() 
          })
      })
      test("error when there is no description", (done) => {
        request(app)
          .post("/products")
          .send({stock: 10, name: "ps5", image:"testing", price:8000000})
          .set("access_token", token)
          .end((err, res) => {
            const { body, status } = res
            if(err){
              return done(err)
            }
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', 'Product description is required!')
            done() 
          })
      })
      test("error when there is no image", (done) => {
        request(app)
          .post("/products")
          .send({stock: 10, name: "ps5", description: "testing", price:8000000})
          .set("access_token", token)
          .end((err, res) => {
            const { body, status } = res
            if(err){
              return done(err)
            }
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', 'Product image is required!')
            done() 
          })
      })
    })
})
describe("Updating products", () =>{
  describe("update Products PUT /products", () => {
    test("update Products PUT /products", (done) => {
      request(app)
        .put(`/products/${ProductId}`)
        .send({stock: 5, name: "ps5", description:"new console from sony", image:"testing", price:8000000})
        .set("access_token", token)
        .end((err, res) => {
          const { body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(200)
          expect(body[0]).toHaveProperty('name', 'ps5')
          expect(body[0]).toHaveProperty('description', 'new console from sony')
          expect(body[0]).toHaveProperty('stock', 5)
          expect(body[0]).toHaveProperty('image', "testing")
          expect(body[0]).toHaveProperty('price', 8000000)
          done() 
        })
    })
  })
  describe("error updating products", () => {
    test("error when there is no token", (done) => {
      request(app)
        .put(`/products/${ProductId}`)
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

describe("update Product's stock PATCH /products", () => {
  test("update Products stock PATCH /products", (done) => {
    request(app)
      .put(`/products/${ProductId}`)
      .send({stock: 5})
      .set("access_token", token)
      .end((err, res) => {
        const { body, status } = res
        if(err){
          return done(err)
        }
        expect(status).toBe(200)
        expect(body[0]).toHaveProperty('stock', 5)
        done() 
      })
  })
})

describe("Deleting products", () =>{
  describe("Delete Products DELETE /products", () => {
    test("Delete Products DELETE /products", (done) => {
      request(app)
        .delete(`/products/${ProductId}`)
        .set("access_token", token)
        .end((err, res) => {
          const { body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(200)
          expect(body).toHaveProperty('message', 'Product success to delete')
          done() 
        })
    })
  })
  describe("error deleting products", () => {
    test("error when there is no token", (done) => {
      request(app)
        .put(`/products/${ProductId}`)
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
    test("error when there is no product", (done) => {
      request(app)
        .delete(`/products/${RandomId}`)
        .set("access_token", token)
        .end((err, res) => {
          const { body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', 'sorry, no product was found')
          done() 
        })
    })
  })
})