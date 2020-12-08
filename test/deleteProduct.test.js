const request = require("supertest")
const app = require("../app.js")
const { sequelize } = require("../models/index.js")
const { queryInterface } = sequelize
let bcrypt = require("bcryptjs")
let jwt = require("jsonwebtoken")
let access_token_admin;
let access_token_customer;
let ProductId;


afterAll(done => {
  queryInterface.bulkDelete("Products")
    .then(response => {
      return queryInterface.bulkDelete("Admins")
    })
    .then(response => {
      return queryInterface.bulkDelete("Users")
    })
    .then(response => {
      done()
    })
    .catch(err => {
      done(err)
    })
})

beforeAll(done => {
  queryInterface.bulkInsert("Products", [{
    name: "Book",
    image_url: "https://cdn.shopify.com/s/files/1/2177/5447/products/Fitz-Porsche-Ultimate-Series_1024x1024.jpg?v=1570630108",
    price: 50000,
    stock: 10,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {
    returning: true
  })
    .then(products => {
      ProductId = products[0].id
      salt = bcrypt.genSaltSync(10);
      hash = bcrypt.hashSync("qweqwe", salt);
      return queryInterface.bulkInsert("Admins" , [{
        email: "admintest@mail.com",
        password: hash,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      }], {
        returning: true
      })
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

describe("Delete Products DELETE /admin/products/:id", () => {
  describe("Succesfully delete", () => {
    test ("response succesfully delete", done => {
      request(app)
        .delete(`/admin/products/${ProductId}`)
        .set("access_token", access_token_admin)
        .end((err, res) => {
          const { body, status } = res
          if(err) return done(err)
          expect(status).toBe(200)
          expect(body).toMatchObject({message: "Successfully delete product"})
          done()
        })
    })
  })

  describe("Failed delete", () => {
    test ("wrong token", done => {
      request(app)
        .delete(`/admin/products/${ProductId}`)
        .set("access_token", access_token_customer)
        .end((err, res) => {
          const { body, status } = res
          if(err) return done(err)
          expect(status).toBe(401)
          expect(body).toMatchObject({message: "You are not authorized"})
          done()
        })
    })
  })

  describe("Failed delete", () => {
    test ("data not found", done => {
      request(app)
        .delete(`/admin/products/${ProductId-1}`)
        .set("access_token", access_token_admin)
        .end((err, res) => {
          const { body, status } = res
          if(err) return done(err)
          expect(status).toBe(404)
          expect(body).toMatchObject({message: "Error! Data not found"})
          done()
        })
    })
  })

  describe("Failed delete", () => {
    test ("no token", done => {
      request(app)
        .delete(`/admin/products/${ProductId}`)
        .end((err, res) => {
          const { body, status } = res
          if(err) return done(err)
          expect(status).toBe(401)
          expect(body).toMatchObject({message: "Please login first"})
          done()
        })
    })
  })
})