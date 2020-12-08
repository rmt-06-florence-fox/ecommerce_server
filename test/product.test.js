const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models/index')
const { queryInterface } = sequelize

let access_token
let idTrial
let idFailDelete
let access_token_cust

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

beforeAll(function(done) {
    request(app)
    .post("/login")
    .send({email: "customer1@mail.com", password: "123456"})
    .end(function(err, res) {
        if(err) {
            done(err)
        }
        access_token_cust = res.body.access_token
        done()
    })
})

beforeAll((done) => {
    queryInterface.bulkInsert("Products", [{
        name: 'Kereta Percobaan',
        image_url: 'hahaha',
        price: 10000000,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
    }], {returning: true})
    .then(response => {
        idFailDelete = response[0].id
        done()
    })
    .catch(error => {
        done(error)
    })
})

afterAll((done) => {
    queryInterface.bulkDelete("Products")
    .then(response => {
        done()
    })
    .catch(error => {
        done(error)
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
            idTrial = body.id
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
        .set('access_token', access_token_cust)
        .send({name: 'Kereta Diesel (Gatotkaca)', image_url: 'https://rachmahreirra.files.wordpress.com/2015/03/14b6a-kereta-api-diesel.jpg', price: 4000000 , stock: 5})
        .end(function(err, res) {
            const { status, body } = res
            if(err) {
                done(err)
            }
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
        .send({name: 'Kereta Diesel (Gatotkaca)', image_url: 'https://rachmahreirra.files.wordpress.com/2015/03/14b6a-kereta-api-diesel.jpg', price: -5, stock: 5})
        .end(function(err, res) {
            const { status, body } = res
            if(err) {
                done(err)
            }
            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Price must greater than or equal to 0")
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
            expect(body).toHaveProperty("message", "Stock must greater than or equal to 0")
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

describe("Update Product", () => {
    test("response with data updated", function(done) {
        request(app)
        .put("/product/" + idTrial)
        .set('access_token', access_token)
        .send({name: 'Wiro Sableng', image_url: 'https://rachmahreirra.files.wordpress.com/2015/03/14b6a-kereta-api-diesel.jpg', price: 10000000 , stock: 10})
        .end(function(err, res) {
            const { status, body } = res
            if(err) {
                done(err)
            }
            expect(status).toBe(200)
            expect(body).toHaveProperty("name", "Wiro Sableng")
            expect(body).toHaveProperty("image_url", "https://rachmahreirra.files.wordpress.com/2015/03/14b6a-kereta-api-diesel.jpg")
            expect(body).toHaveProperty("price", 10000000)
            expect(body).toHaveProperty("stock", 10)
            done()
        })
    }),
    test("response with please login first", function(done) {
        request(app)
        .put("/product/" + idTrial)
        .send({name: 'Wiro Sableng', image_url: 'https://rachmahreirra.files.wordpress.com/2015/03/14b6a-kereta-api-diesel.jpg', price: 10000000 , stock: 10})
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
        .put("/product/" + idTrial)
        .set('access_token', access_token_cust)
        .send({name: 'Wiro Sableng', image_url: 'https://rachmahreirra.files.wordpress.com/2015/03/14b6a-kereta-api-diesel.jpg', price: 10000000 , stock: 10})
        .end(function(err, res) {
            const { status, body } = res
            if(err) {
                done(err)
            }
            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "Invalid account")
            done()
        })
    }),
    test("response with stock can not minus", function(done) {
        request(app)
        .put("/product/" + idTrial)
        .set('access_token', access_token)
        .send({name: 'Wiro Sableng', image_url: 'https://rachmahreirra.files.wordpress.com/2015/03/14b6a-kereta-api-diesel.jpg', price: 10000000 , stock: -10})
        .end(function(err, res) {
            const { status, body } = res
            if(err) {
                done(err)
            }
            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Stock must greater than or equal to 0")
            done()
        })
    }),
    test("response with price can not minus", function(done) {
        request(app)
        .put("/product/" + idTrial)
        .set('access_token', access_token)
        .send({name: 'Wiro Sableng', image_url: 'https://rachmahreirra.files.wordpress.com/2015/03/14b6a-kereta-api-diesel.jpg', price: -10000000 , stock: 10})
        .end(function(err, res) {
            const { status, body } = res
            if(err) {
                done(err)
            }
            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Price must greater than or equal to 0")
            done()
        })
    }),
    test("response with stock is required", function(done) {
        request(app)
        .put("/product/" + idTrial)
        .set('access_token', access_token)
        .send({name: 'Wiro Sableng', image_url: 'https://rachmahreirra.files.wordpress.com/2015/03/14b6a-kereta-api-diesel.jpg', price: 10000000 , stock: null})
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
    test("response with price is required", function(done) {
        request(app)
        .put("/product/" + idTrial)
        .set('access_token', access_token)
        .send({name: 'Wiro Sableng', image_url: 'https://rachmahreirra.files.wordpress.com/2015/03/14b6a-kereta-api-diesel.jpg', price: null , stock: 10})
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
    test("response with name is required", function(done) {
        request(app)
        .put("/product/" + idTrial)
        .set('access_token', access_token)
        .send({name: '', image_url: 'https://rachmahreirra.files.wordpress.com/2015/03/14b6a-kereta-api-diesel.jpg', price: 5000000 , stock: 10})
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
        .put("/product/" + idTrial)
        .set('access_token', access_token)
        .send({name: 'Kereta Arjuna', image_url: '', price: 5000000 , stock: 10})
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
    test("response with price must in integer", function(done) {
        request(app)
        .put("/product/" + idTrial)
        .set('access_token', access_token)
        .send({name: 'Kereta Arjuna', image_url: 'https://rachmahreirra.files.wordpress.com/2015/03/14b6a-kereta-api-diesel.jpg', price: 'asasasa' , stock: 10})
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
        .put("/product/" + idTrial)
        .set('access_token', access_token)
        .send({name: 'Kereta Arjuna', image_url: 'https://rachmahreirra.files.wordpress.com/2015/03/14b6a-kereta-api-diesel.jpg', price: 6000000 , stock: 'sasasasas'})
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

describe("Delete Product", () => {
    test("response with data deleted", function(done) {
        request(app)
        .delete("/product/" + idTrial)
        .set('access_token', access_token)
        .end(function(err, res) {
            const { status, body } = res
            if(err) {
                done(err)
            }
            expect(status).toBe(200)
            expect(body).toHaveProperty("message", "Data deleted successful")
            done()
        })
    }),
    test("response with please login first", function(done) {
        request(app)
        .delete("/product/" + idFailDelete)
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
        .delete("/product/" + idFailDelete)
        .set('access_token', access_token_cust)
        .end(function(err, res) {
            const { status, body } = res
            if(err) {
                done(err)
            }
            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "Invalid account")
            done()
        })
    })
})

describe("Get Product", () => {
    test("response with data products", (done) => {
        request(app)
        .get("/product")
        .end(function(err, res) {
            const { status, body } = res
            if (err) {
                done(err)
            }
            expect(status).toBe(200)
            for (let i = 0; i < res.body.length; i++) {
                expect(body).toHaveProperty("name", body.name)
                expect(body).toHaveProperty("image_url", body.image_url)
                expect(body).toHaveProperty("price", body.price)
                expect(body).toHaveProperty("stock", body.stock)
            }
            done()
        })
    })
})