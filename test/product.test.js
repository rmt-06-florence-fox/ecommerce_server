const request = require('supertest');
const app = require('../app')

const {sequelize} = require('../models')
const {queryInterface} = sequelize
const {generateToken} = require('../helpers/jwt')


let access_token;

beforeAll(function(done) {    
    request(app)
        .post('/login')
        .send({email:'efrizal@gmail.com', password:'123456'})
        .end((err, res) => {
            if (err) {
               return done(err)
            }
            else {
                access_token = res.body.access_token
                done()
            }
        })
})

afterAll(() => {
    queryInterface.
    bulkDelete("Products", null, {})
})


describe("POST/products", () => {
    describe("Success add product", () => {
        test("create product with accept body value", done => {
            request(app)
            .post('/products')
            .set('access_token', access_token)
            .send({ name: 'book',
                    image_url: 'https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg',
                    price: 10000,
                    stock: 20
                })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                   return done(err)
                }
                else {
                    expect(status).toBe(201)
                    expect(body).toHaveProperty("name", "book")
                    expect(body).toHaveProperty("image_url", 'https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg')
                    expect(body).toHaveProperty("price", 10000)
                    expect(body).toHaveProperty("stock", 20)
                    done()
                }
            })
        })
    })
})

describe("POST/products", () => {
    describe("Error add product", () => {
        test("create product without access token", done => {
            request(app)
            .post('/products')
            .send({ name: 'book',
                    image_url: 'https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg',
                    price: 10000,
                    stock: 20
                })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                   return done(err)
                }
                else {
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('message', `Access denied, please login first`)
                    done()
                }
            })
        })
    })
})

describe("POST/products", () => {
    describe("Error add product", () => {
        test("create product with wrong access token", done => {
            request(app)
            .post('/products')
            .set('access_token', 'fake_access_token')
            .send({ name: 'book',
                    image_url: 'https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg',
                    price: 10000,
                    stock: 20
                })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                   return done(err)
                }
                else {
                     expect(status).toBe(400)
                    expect(body).toHaveProperty('message', `jwt malformed`)
                    done()
                }
            })
        })
    })
})

describe("POST/products", () => {
    describe("Error add product", () => {
        test("error empty field name", done => {
            request(app)
            .post('/products')
            .set('access_token', access_token)
            .send({ name: '',
                    image_url: 'https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg',
                    price: 10000,
                    stock: 20
            })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                   return done(err)
                }
                else {
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', `name is required`)
                    done()
                }
            })
        })
    })
})

describe("POST/products", () => {
    describe("Error add product", () => {
        test("error empty field image_url", done => {
            request(app)
            .post('/products')
            .set('access_token', access_token)
            .send({ name: 'book',
                    image_url: '',
                    price: 10000,
                    stock: 20
                })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                   return done(err)
                }
                else {
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', `image is required`)
                    done()
                }
            })
        })
    })
})

describe("POST/products", () => {
    describe("Error add product", () => {
        test("error empty field price", done => {
            request(app)
            .post('/products')
            .set('access_token', access_token)
            .send({ name: 'book',
                    image_url: 'https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg',
                    price: '',
                    stock: 20
                })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                   return done(err)
                }
                else {
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', `price is required`)
                    done()
                }
            })
        })
    })
})

describe("POST/products", () => {
    describe("Error add product", () => {
        test("error empty field stock", done => {
            request(app)
            .post('/products')
            .set('access_token', access_token)
            .send({ name: 'book',
                    image_url: 'https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg',
                    price: 10000,
                    stock: ''
                })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                   return done(err)
                }
                else {
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', `stock is required`)
                    done()
                }
            })
        })
    })
})

describe("POST/products", () => {
    describe("Error add product", () => {
        test("price must be a positive number", done => {
            request(app)
            .post('/products')
            .set('access_token', access_token)
            .send({ name: 'book',
                    image_url: 'https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg',
                    price: -10000,
                    stock: 20
                })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                   return done(err)
                }
                else {
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', `price cannot be a negative value`)
                    done()
                }
            })
        })
    })
})

describe("POST/products", () => {
    describe("Error add product", () => {
        test("stock must be a positive number", done => {
            request(app)
            .post('/products')
            .set('access_token', access_token)
            .send({ name: 'book',
                    image_url: 'https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg',
                    price: 10000,
                    stock: -20
                })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                   return done(err)
                }
                else {
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', `stock cannot be a negative value`)
                    done()
                }
            })
        })
    })
})
