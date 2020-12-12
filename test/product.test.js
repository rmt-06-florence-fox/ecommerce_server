const request = require('supertest')
const app = require('../app')
const {
    User
} = require('../models')
const {
    createToken
} = require('../helpers/jwt')
const {sequelize} = require('../models')
const { queryInterface } = sequelize


let access_token_admin = ''
let access_token_customer = ''
let productId
let successProductId
let ProductData = {
    name: 'jaket',
    imageUrl: 'test',
    stock: 10,
    price: 5000
}
let ProductData2 = {
    name: 'jeans',
    imageUrl: 'test',
    stock: 19,
    price: 7000
}

let ProductData3 = {
    name: '',
    imageUrl: 'test',
    stock: 9,
    price: 8000
}

let ProductData4 = {
    name: 'kaos',
    imageUrl: 'test',
    stock: -9,
    price: 8000
}

let ProductData5 = {
    name: 'kaos',
    imageUrl: 'test',
    stock: 9,
    price: -8000
}

let ProductData6 = {
    name: 'kaos',
    imageUrl: 'test',
    stock: 'string',
    price: 8000
}

beforeAll((done) => {
    User.findOne({
            where: {
                email: "admin@mail.com"
            }
        })
        .then(admin => {
            access_token_admin = createToken({
                id: admin.id,
                email: admin.email
            })
            return User.findOne({
                where: {
                    email: "customer@mail.com"
                }
            })
        })
        .then(customer => {
            access_token_customer = createToken({
                id: customer.id,
                email: customer.email
            })
            done()
        })
        .catch(err => {
            done(err)
        })
})

afterAll((done) => {
    queryInterface.bulkDelete("Products")
        .then(response => {
            done()
        })
        .catch(err => {
            done(err)
        })
});


describe("CRUD products", () => {
    describe("Success CRUD ", () => {
        test("create product POST /products", (done) => {
            request(app)
                .post('/products')
                .send(ProductData)
                .set('access_token', access_token_admin)
                .end(function (err, res) {
                    const { body, status } = res
                    productId = res.body.id
                    successProductId = res.body.id
                    if (err) return done(err);
                    expect(status).toBe(201)
                    expect(body).toHaveProperty("name", ProductData.name)
                    expect(body).toHaveProperty("imageUrl", ProductData.imageUrl)
                    expect(body).toHaveProperty("stock", ProductData.stock)
                    expect(body).toHaveProperty("price", ProductData.price)
                    done();
                })
        }),
        test("update product PUT /products/:id", (done) => {
            request(app)
                .put(`/products/${productId}`)
                .send(ProductData2)
                .set('access_token', access_token_admin)
                .end(function (err, res) {
                    const { body, status } = res
                    if (err) return done(err);
                    expect(status).toBe(200)
                    expect(body).toHaveProperty("message", "Data success updated")
                    done();
                })
        }),
        test("get all products GET /products", (done) => {
            request(app)
                .get('/products')
                .set('access_token', access_token_admin)
                .end(function (err, res) {
                    const { body, status } = res
                    if (err) return done(err);
                    expect(status).toBe(200)
                    done();
                })
        })
    }),
    describe("Failed CRUD and success deleted", () => {
        test("failed create product POST /products with no token", (done) => {
            request(app)
                .post('/products')
                .send(ProductData)
                .set('access_token', null)
                .end(function (err, res) {
                    const { body, status } = res
                    productId = res.body.id
                    if (err) return done(err);
                    expect(status).toBe(500)
                    // expect(body).toHaveProperty("message", "Please login first")
                    done();
                })
        }),
        test("failed create product POST /products with not admin token", (done) => {
            request(app)
                .post('/products')
                .send(ProductData)
                .set('access_token', access_token_customer)
                .end(function (err, res) {
                    const { body, status } = res
                    productId = res.body.id
                    if (err) return done(err);
                    expect(status).toBe(401)
                    expect(body).toHaveProperty("message", "You are not authorized")
                    done();
                })
        }),
        test("failed create product POST /products with missing required field", (done) => {
            request(app)
                .post('/products')
                .send(ProductData3)
                .set('access_token', access_token_admin)
                .end(function (err, res) {
                    const { body, status } = res
                    productId = res.body.id
                    if (err) return done(err);
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "Name is required")
                    done();
                })
        }),
        test("failed create product POST /products with stock minus", (done) => {
            request(app)
                .post('/products')
                .send(ProductData4)
                .set('access_token', access_token_admin)
                .end(function (err, res) {
                    const { body, status } = res
                    productId = res.body.id
                    if (err) return done(err);
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "Stock should not be less than 0")
                    done();
                })
        }),
        test("failed create product POST /products with price minus", (done) => {
            request(app)
                .post('/products')
                .send(ProductData5)
                .set('access_token', access_token_admin)
                .end(function (err, res) {
                    const { body, status } = res
                    productId = res.body.id
                    if (err) return done(err);
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "Price should not be less than 0")
                    done();
                })
        }),
        test("failed create product POST /products with stock is a string", (done) => {
            request(app)
                .post('/products')
                .send(ProductData6)
                .set('access_token', access_token_admin)
                .end(function (err, res) {
                    const { body, status } = res
                    productId = res.body.id
                    if (err) return done(err);
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "Fill stock with numbers")
                    done();
                })
        }),
        test("failed update product PUT /products/:id with no access_token", (done) => {
            request(app)
                .put(`/products/${productId}`)
                .send(ProductData2)
                .set('access_token', null)
                .end(function (err, res) {
                    const { body, status } = res
                    if (err) return done(err);
                    expect(status).toBe(500)
                    done();
                })
        }),
        test("failed update product PUT /products/:id with not admin access_token", (done) => {
            request(app)
                .put(`/products/${productId}`)
                .send(ProductData2)
                .set('access_token', access_token_customer)
                .end(function (err, res) {
                    const { body, status } = res
                    if (err) return done(err);
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('message', 'You are not authorized')
                    done();
                })
        }),
        test("failed update product PUT /products/:id with minus stock", (done) => {
            request(app)
                .put(`/products/${productId}`)
                .send(ProductData4)
                .set('access_token', access_token_admin)
                .end(function (err, res) {
                    const { body, status } = res
                    if (err) return done(err);
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'Stock should not be less than 0')
                    done();
                })
        }),
        test("failed update product PUT /products/:id with stock as a string", (done) => {
            request(app)
                .put(`/products/${productId}`)
                .send(ProductData6)
                .set('access_token', access_token_admin)
                .end(function (err, res) {
                    const { body, status } = res
                    if (err) return done(err);
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'Fill stock with numbers')
                    done();
                })
        }),
        test("failed update product PUT /products/:id with minus price", (done) => {
            request(app)
                .put(`/products/${productId}`)
                .send(ProductData5)
                .set('access_token', access_token_admin)
                .end(function (err, res) {
                    const { body, status } = res
                    if (err) return done(err);
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'Price should not be less than 0')
                    done();
                })
        }),
        test("failed delete product DELETE /products/:id with no access_token", (done) => {
            request(app)
                .delete(`/products/${successProductId}`)
                .set('access_token', null)
                .end(function (err, res) {
                    const { body, status } = res
                    if (err) return done(err);
                    expect(status).toBe(500)
                    done();
                })
        }),
        test("failed delete product DELETE /products/:id with not admin access_token", (done) => {
            request(app)
                .delete(`/products/${successProductId}`)
                .set('access_token', access_token_customer)
                .end(function (err, res) {
                    const { body, status } = res
                    if (err) return done(err);
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('message', 'You are not authorized')
                    done();
                })
        }),
        test("delete product DELETE /products/:id", (done) => {
            request(app)
                .delete(`/products/${successProductId}`)
                .set('access_token', access_token_admin)
                .end(function (err, res) {
                    const { body, status } = res
                    if (err) return done(err);
                    expect(status).toBe(200)
                    expect(body).toHaveProperty("message", "Data success deleted")
                    done();
                })
        })
    })
})