const request = require('supertest')
const app = require('../app')
const { getToken } = require('../helpers/jwt')
let access_token

beforeAll(function(done) {
    request(app)
    .post("/login")
    .send({email: "admin@mail.com", password: "123456"})
    .end(function(err, res) {
        if(err) {
            done(err)
        }
        access_token = res.body.access_token
        done()
    })
})

describe("Create Product", () => {
    test("response with new data added", function(done) {
        request(app)
        .post("/product")
        .set('access_token', access_token)
        .send({name: 'Kereta Diesel (Gatotkaca)', image_url: 'https://rachmahreirra.files.wordpress.com/2015/03/14b6a-kereta-api-diesel.jpg', price: 4000000 , stock: 5})
        .end(function(err, res) {
            const { status, body } = res
            if(err) {
                done(err)
            }
            expect(status).toBe(201)
            expect(body).toHaveProperty("name", "Kereta Diesel (Gatotkaca)")
            expect(body).toHaveProperty("image_url", "https://rachmahreirra.files.wordpress.com/2015/03/14b6a-kereta-api-diesel.jpg")
            expect(body).toHaveProperty("price", 4000000)
            expect(body).toHaveProperty("stock", 5)
            done()
        })
    }),
    test("response with please login first", function(done) {
        request(app)
        .post("/product")
        .send({name: 'Kereta Diesel (Gatotkaca)', image_url: 'https://rachmahreirra.files.wordpress.com/2015/03/14b6a-kereta-api-diesel.jpg', price: 4000000 , stock: 5})
        .end(function(err, res) {
            const { status, body } = res
            if(err) {
                done(err)
            }
            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "Please login first")
            done()
        })
    }),
    test("response with invalid account", function(done) {
        request(app)
        .post("/product")
        .set('access_token', 'aaaaaa')
        .send({name: 'Kereta Diesel (Gatotkaca)', image_url: 'https://rachmahreirra.files.wordpress.com/2015/03/14b6a-kereta-api-diesel.jpg', price: 4000000 , stock: 5})
        .end(function(err, res) {
            const { status, body } = res
            if(err) {
                done(err)
            }
            console.log('body >>>', body )
            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "Invalid account")
            done()
        })
    }),
    test("response with name is required", function(done) {
        request(app)
        .post("/product")
        .set('access_token', access_token)
        .send({name: '', image_url: 'https://rachmahreirra.files.wordpress.com/2015/03/14b6a-kereta-api-diesel.jpg', price: 4000000 , stock: 5})
        .end(function(err, res) {
            const { status, body } = res
            if(err) {
                done(err)
            }
            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Name is required")
            done()
        })
    }),
    test("response with image is required", function(done) {
        request(app)
        .post("/product")
        .set('access_token', access_token)
        .send({name: 'Kereta Diesel (Gatotkaca)', image_url: '', price: 4000000 , stock: 5})
        .end(function(err, res) {
            const { status, body } = res
            if(err) {
                done(err)
            }
            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Image is required")
            done()
        })
    }),
    test("response with price is required", function(done) {
        request(app)
        .post("/product")
        .set('access_token', access_token)
        .send({name: 'Kereta Diesel (Gatotkaca)', image_url: 'https://rachmahreirra.files.wordpress.com/2015/03/14b6a-kereta-api-diesel.jpg', price: null, stock: 5})
        .end(function(err, res) {
            const { status, body } = res
            if(err) {
                done(err)
            }
            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Price is required")
            done()
        })
    }),
    test("response with price greater than 0", function(done) {
        request(app)
        .post("/product")
        .set('access_token', access_token)
        .send({name: 'Kereta Diesel (Gatotkaca)', image_url: 'https://rachmahreirra.files.wordpress.com/2015/03/14b6a-kereta-api-diesel.jpg', price: 0, stock: 5})
        .end(function(err, res) {
            const { status, body } = res
            if(err) {
                done(err)
            }
            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Price must greater than 0")
            done()
        })
    }),
    test("response with stock is required", function(done) {
        request(app)
        .post("/product")
        .set('access_token', access_token)
        .send({name: 'Kereta Diesel (Gatotkaca)', image_url: 'https://rachmahreirra.files.wordpress.com/2015/03/14b6a-kereta-api-diesel.jpg', price: 4000000, stock: null})
        .end(function(err, res) {
            const { status, body } = res
            if(err) {
                done(err)
            }
            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Stock is required")
            done()
        })
    }),
    test("response with stock can not negative", function(done) {
        request(app)
        .post("/product")
        .set('access_token', access_token)
        .send({name: 'Kereta Diesel (Gatotkaca)', image_url: 'https://rachmahreirra.files.wordpress.com/2015/03/14b6a-kereta-api-diesel.jpg', price: 4000000, stock: -1})
        .end(function(err, res) {
            const { status, body } = res
            if(err) {
                done(err)
            }
            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Stock can not negative")
            done()
        })
    }),
    test("response with price must in integer", function(done) {
        request(app)
        .post("/product")
        .set('access_token', access_token)
        .send({name: 'Kereta Diesel (Gatotkaca)', image_url: 'https://rachmahreirra.files.wordpress.com/2015/03/14b6a-kereta-api-diesel.jpg', price: 'aku', stock: 5})
        .end(function(err, res) {
            const { status, body } = res
            if(err) {
                done(err)
            }
            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Price must in integer")
            done()
        })
    }),
    test("response with stock must in integer", function(done) {
        request(app)
        .post("/product")
        .set('access_token', access_token)
        .send({name: 'Kereta Diesel (Gatotkaca)', image_url: 'https://rachmahreirra.files.wordpress.com/2015/03/14b6a-kereta-api-diesel.jpg', price: 4000000, stock: 'kamu'})
        .end(function(err, res) {
            const { status, body } = res
            if(err) {
                done(err)
            }
            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Stock must in integer")
            done()
        })
    })
})