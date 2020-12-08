const request = require("supertest")
const app = require("../app.js")
const { sequelize } = require("../models/index.js")
const { queryInterface } = sequelize
let productList;
// let bcrypt = require("bcryptjs")
// let jwt = require("jsonwebtoken")
// let access_token_admin;
// let access_token_customer;
// let salt;
// let hash;

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
      productList = products
      // salt = bcrypt.genSaltSync(10);
      // hash = bcrypt.hashSync("qweqwe", salt);
      done()
    //   return queryInterface.bulkInsert("Admins" , [{
    //     email: "admintest@mail.com",
    //     password: hash,
    //     role: "admin",
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   }], {
    //     returning: true
    //   })
    // })
    // .then(admin => {
    //   access_token_admin = jwt.sign({ id: admin[0].id, email: admin[0].email, role: admin[0].role }, process.env.secretJWT);
    //   return queryInterface.bulkInsert("Users", [{
    //     email: "usertest@mail.com",
    //     password: hash,
    //     role: "customer",
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   }], {
    //     returning: true
    //   })
    // })
    // .then(customer => {
    //   access_token_customer = jwt.sign({ id: customer[0].id, email: customer[0].email, role: customer[0].role }, process.env.secretJWT);
    //   done()
    // })
    })
    .catch(err => {
      done(err)
    })
})
describe("Product Read GET /products", () => {
  describe("Succesfully fetch products", () => {
    test ("response with product list with admin token", (done) => {
      request(app)
        .get("/products")
        .end((err, res) => {
          const { body, status } = res
          if(err) return done(err)
          expect(status).toBe(200)
          expect(body[0]).toHaveProperty("name", productList[0].name)
          expect(body[0]).toHaveProperty("image_url", productList[0].image_url)
          expect(body[0]).toHaveProperty("price", productList[0].price)
          expect(body[0]).toHaveProperty("stock", productList[0].stock)
          done()
        })
    })
  })
})