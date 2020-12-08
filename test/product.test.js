const request = require("supertest")
const app = require("../app.js")
const { sequelize } = require("../models/index.js")
const { queryInterface } = sequelize
let productList;

afterAll(done => {
  queryInterface.bulkDelete("Products")
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
    })
})
describe("Product Read GET /products", () => {
  describe("Succesfully fetch products", () => {
    test ("response with product list", (done) => {
      request(app)
        .get("/products")
        .end((err, res) => {
          const { body, status } = res
          if(err) return done(err)
          expect(status).toBe(200)
          expect(body).toEqual(
            expect.arrayContaining([
              {
                id: productList[0].id,
                image_url: productList[0].image_url,
                name: productList[0].name,
                price: productList[0].price,
                stock: productList[0].stock
          }]))
          done()
        })
    })
  })
})