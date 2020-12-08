const request = require("supertest")
const app = require("../app.js")
const { sequelize } = require("../models/index.js")
const { queryInterface } = sequelize
let bcrypt = require("bcryptjs")
let jwt = require("jsonwebtoken")
let access_token_admin;
let access_token_customer;


afterAll(done => {
  queryInterface.bulkDelete("Products")
    .then(response => {
      return queryInterface.bulkDelete("Admins")
    })
    .then(response => {
      done()
    })
    .catch(err => {
      done(err)
    })
})

beforeAll(done => {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync("qweqwe", salt);
  queryInterface.bulkInsert("Admins", [{
    email: "admintest@mail.com",
    password: hash,
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date()
  }], {
    returning: true
  })
    .then(admin => {
      access_token_admin = jwt.sign({ id: admin[0].id, email: admin[0].email, role: admin[0].role }, process.env.secretJWT);
      return queryInterface.bulkInsert("Users", [{
        email: "usertest@mail.com",
        password: hash,
        role: "customer",
        createdAt: new Date(),
        updatedAt: new Date()
      }], {
        returning: true
      })
    })
    .then(customer => {
      access_token_customer = jwt.sign({ id: customer[0].id, email: customer[0].email, role: customer[0].role }, process.env.secretJWT);
      done()
    })
    .catch(err => {
      done(err)
    })
})


describe("Product POST /products", () => {
  describe("Successfully add products", () => {
    test ("Response with added product", done => {
      request(app)
        .post("/products")
        .set("access_token", access_token_admin)
        .send({
          name: "Book",
          image_url: "https://cdn.shopify.com/s/files/1/2177/5447/products/Fitz-Porsche-Ultimate-Series_1024x1024.jpg?v=1570630108",
          price: 50000,
          stock: 10
        })
        .end((err, res) => {
          const { body, status } = res
          if(err) return done(err)
          expect(status).toBe(201)
          expect(body).toMatchObject({
            name: "Book",
            image_url: "https://cdn.shopify.com/s/files/1/2177/5447/products/Fitz-Porsche-Ultimate-Series_1024x1024.jpg?v=1570630108",
            price: 50000,
            stock: 10
          })
          done()
        })
    })
  })

  describe("Failed to add products", () => {
    test ("No token", done => {
      request(app)
      .post("/products")
      .send({
        name: "Book",
        image_url: "https://cdn.shopify.com/s/files/1/2177/5447/products/Fitz-Porsche-Ultimate-Series_1024x1024.jpg?v=1570630108",
        price: 50000,
        stock: 10
      })
      .end((err, res) => {
        const { body, status } = res
        if(err) return done(err)
        expect(status).toBe(401)
        expect(body).toMatchObject({message: "Please login first"})
        done()
      })
    })
  })

  describe("Failed to add products", () => {
    test ("Wrong token", done => {
      request(app)
      .post("/products")
      .set("access_token", access_token_customer)
      .send({
        name: "Book",
        image_url: "https://cdn.shopify.com/s/files/1/2177/5447/products/Fitz-Porsche-Ultimate-Series_1024x1024.jpg?v=1570630108",
        price: 50000,
        stock: 10
      })
      .end((err, res) => {
        const { body, status } = res
        if(err) return done(err)
        expect(status).toBe(401)
        expect(body).toMatchObject({message: "You are not authorized"})
        done()
      })
    })
  })

  describe("Failed to add products", () => {
    test ("Empty Value", done => {
      request(app)
      .post("/products")
      .set("access_token", access_token_admin)
      .send({
        name: "",
        image_url: "https://cdn.shopify.com/s/files/1/2177/5447/products/Fitz-Porsche-Ultimate-Series_1024x1024.jpg?v=1570630108",
        price: 50000,
        stock: 10
      })
      .end((err, res) => {
        const { body, status } = res
        if(err) return done(err)
        expect(status).toBe(400)
        expect(body).toMatchObject({message: ["Book name should not be empty"]})
        done()
      })
    })
  })

})