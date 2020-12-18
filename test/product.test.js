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
        test("price must be a positive valuer", done => {
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
        test("stock must be a positive value", done => {
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

describe("POST/products", () => {
    describe("Error add product", () => {
        test("image URL input must be a valid URL", done => {
            request(app)
            .post('/products')
            .set('access_token', access_token)
            .send({ name: 'book',
                    image_url: 'wwwindustrycom',
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
                    expect(body).toHaveProperty('message', `image URL input must be a valid url`)
                    done()
                }
            })
        })
    })
})

describe("POST/products", () => {
    describe("Error add product", () => {
        test("price input must be a valid number", done => {
            request(app)
            .post('/products')
            .set('access_token', access_token)
            .send({ name: 'book',
                    image_url: 'https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg',
                    price: '10000xyz',
                    stock: 20
                })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                   return done(err)
                }
                else {
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', `price input must be a valid number`)
                    done()
                }
            })
        })
    })
})

describe("POST/products", () => {
    describe("Error add product", () => {
        test("stock input must be a valid number", done => {
            request(app)
            .post('/products')
            .set('access_token', access_token)
            .send({ name: 'book',
                    image_url: 'https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg',
                    price: 10000,
                    stock: 'abc'
                })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                   return done(err)
                }
                else {
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', `stock input must be a valid number`)
                    done()
                }
            })
        })
    })
})

// describe("PUT/products", () => {
//     describe("Success update product", () => {
//         test("update product with accept body value", done => {
//             request(app)
//             .put('/products/47')
//             .set('access_token', access_token)
//             .send({ name: 'book',
//                     image_url: 'https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg',
//                     price: 10000,
//                     stock: 500
//                 })
//             .end((err, res) => {
//                 const { body, status } = res
//                 if (err) {
//                    return done(err)
//                 }
//                 else {
//                     expect(status).toBe(200)
//                     expect(body).toHaveProperty("name", "book")
//                     expect(body).toHaveProperty("image_url", 'https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg')
//                     expect(body).toHaveProperty("price", 10000)
//                     expect(body).toHaveProperty("stock", 500)
//                     done()
//                 }
//             })
//         })
//     })
// })

describe("PUT/products", () => {
    describe("Error update product", () => {
        test("update product without access token", done => {
            request(app)
            .put('/products/47')
            .send({ name: 'book',
                    image_url: 'https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg',
                    price: 10000,
                    stock: 500
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

describe("PUT/products", () => {
    describe("Error update product", () => {
        test("update product without access token", done => {
            request(app)
            .put('/products/47')
            .set('access_token', 'fake_access_token')
            .send({ name: 'book',
                    image_url: 'https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg',
                    price: 10000,
                    stock: 500
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

describe("PUT/products", () => {
    describe("Error update product", () => {
        test("update product with negative price value", done => {
            request(app)
            .put('/products/47')
            .set('access_token', access_token)
            .send({ name: 'book',
                    image_url: 'https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg',
                    price: -10000,
                    stock: 500
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

describe("PUT/products", () => {
    describe("Error update product", () => {
        test("update product with negative stock value", done => {
            request(app)
            .put('/products/47')
            .set('access_token', access_token)
            .send({ name: 'book',
                    image_url: 'https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg',
                    price: 10000,
                    stock: -500
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

describe("PUT/products", () => {
    describe("Error update product", () => {
        test("update product with non URL image value", done => {
            request(app)
            .put('/products/47')
            .set('access_token', access_token)
            .send({ name: 'book',
                    image_url: 'httpscdnelearningindustrycom',
                    price: 10000,
                    stock: 500
                })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                   return done(err)
                }
                else {
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', `image URL input must be a valid url`)
                    done()
                }
            })
        })
    })
})

describe("PUT/products", () => {
    describe("Error update product", () => {
        test("update product with non number price value", done => {
            request(app)
            .put('/products/47')
            .set('access_token', access_token)
            .send({ name: 'book',
                    image_url: 'https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg',
                    price: 'abc',
                    stock: 500
                })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                   return done(err)
                }
                else {
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', `price input must be a valid number`)
                    done()
                }
            })
        })
    })
})

describe("PUT/products", () => {
    describe("Error update product", () => {
        test("update product with non number stock value", done => {
            request(app)
            .put('/products/47')
            .set('access_token', access_token)
            .send({ name: 'book',
                    image_url: 'https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg',
                    price: 10000,
                    stock: 'abc'
                })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                   return done(err)
                }
                else {
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', `stock input must be a valid number`)
                    done()
                }
            })
        })
    })
})

describe("DELETE/products", () => {
    describe("Success delete product", () => {
        test("Success delete product with authentication", done => {
            request(app)
            .delete('/products/48')
            .set('access_token', access_token)
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                   return done(err)
                }
                else {
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('message', 'task succes to delete')
                    done()
                }
            })
        })
    })
})

describe("DELETE/products", () => {
    describe("Error delete product", () => {
        test("Error delete product without access token", done => {
            request(app)
            .delete('/products/47')
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

describe("DELETE/products", () => {
    describe("Error delete product", () => {
        test("Error delete product with wrong access token", done => {
            request(app)
            .delete('/products/47')
            .set('access_token', 'fake_access_token')
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
