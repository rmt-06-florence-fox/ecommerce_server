const request = require('supertest');
const app = require('../app')
const { sequelize } = require('../models/index')
const { queryInterface } = sequelize
const jwt = require('jsonwebtoken')

let access_tokenAdmin
let access_tokenCustomer
let id

beforeAll((done) => {
    let dataAdmin = {
        id: "1",
        email: "admin@gmail.com",
        role: "admin"
    }
    let dataCustomer = {
        id: "2",
        email: "customer1@gmail.com",
        role: "customer"
    }
    access_tokenAdmin = jwt.sign(dataAdmin, 'SECRET')
    access_tokenCustomer = jwt.sign(dataCustomer, 'SECRET')
    queryInterface.bulkInsert("Products", [{
        name: "Raket",
        image_url: "https://contents.mediadecathlon.com/p1563585/k$774a14086b94ad60f8b4294399e8543a/junior-badminton-racket-br-160-easy-grip-blue.jpg?&f=452x452",
        price: 100000,
        stock: 3,
        createdAt: new Date(),
        updatedAt: new Date()
    }], { returning: true})
    .then(data => {
        id = data[0].id
        done()
    })
    .catch(err => {
        done(err)
    })
})

afterAll((done) => { 
    queryInterface.bulkDelete("Products")
    .then(() => {
        done()
    })
    .catch(err => {
        done(err)
    })
})

describe("CRUD Products", () => {
    describe("Sukses fetch product", () => {
        test("Response add product", (done) => {
            request(app)
            .get("/products")
            .set("access_token", access_tokenAdmin)
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(200)
                    expect(body).toHaveProperty("data")
                    done()
                }
            }) 
        })
    })
    describe("Sukses add product valid access_token", () => {
        test("Response add product", (done) => {
            request(app)
            .post("/products")
            .send({
                name: "Motor",
                image_url: "https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2020/05/27/3721001315.jpg",
                price: 100000,
                stock: 10
            })
            .set("access_token", access_tokenAdmin)
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(201)
                    expect(body).toHaveProperty("id", expect.any(Number))
    
                    expect(body).toHaveProperty("name")
                    expect(body).toHaveProperty("name", expect.any(String))
    
                    expect(body).toHaveProperty("image_url")
                    expect(body).toHaveProperty("image_url", expect.any(String))
    
                    expect(body).toHaveProperty("price")
                    expect(body).toHaveProperty("price", expect.any(Number))
                    expect(body.price).toBeGreaterThan(0);
    
                    expect(body).toHaveProperty("stock")
                    expect(body).toHaveProperty("stock", expect.any(Number))
                    expect(body.stock).toBeGreaterThan(0);
                    done()
                }
            }) 
        })
    })
    describe("Gagal add product tidak ada akses token atau salah akses token", () => {
        test("Response add product", (done) => {
            request(app)
            .post("/products")
            .send({
                name: "Jacket",
                image_url: "https://s1.inkuiri.net/i/large/https%2Fs1.bukalapak.com%2Fimg%2F19408929951%2Flarge%2Fdata.jpeg",
                price: 200000,
                stock: 20
            })
            .set("access_token", "acstokenabalsadfpj'pasjefiapwejfiaowj2")
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(401)
                    expect(body).toHaveProperty("message", "You need to login first")
                    done()
                }
            }) 
        })
    })
    describe("Gagal add product access_token bukan admin", () => {
        test("Response add product", (done) => {
            request(app)
            .post("/products")
            .send({
                name: "Motor",
                image_url: "https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2020/05/27/3721001315.jpg",
                price: 100000,
                stock: 5
            })
            .set("access_token", access_tokenCustomer)
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(401)
                    expect(body).toHaveProperty("message", "You don't have access")
                    done()
                }
            }) 
        })
    })
    describe("Gagal add product field yang required tidak diisi", () => {
        test("Response add product", (done) => {
            request(app)
            .post("/products")
            .send({
                name: "",
                image_url: "https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2020/05/27/3721001315.jpg",
                price: 100000,
                stock: 5
            })
            .set("access_token", access_tokenAdmin)
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "Validation notEmpty on name failed")
                    done()
                }
            }) 
        })
    })
    describe("Gagal add product price diisi angka minus", () => {
        test("Response add product", (done) => {
            request(app)
            .post("/products")
            .send({
                name: "Motor",
                image_url: "https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2020/05/27/3721001315.jpg",
                price: -1,
                stock: 5
            })
            .set("access_token", access_tokenAdmin)
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "Validation min on price failed")
                    done()
                }
            }) 
        })
    })
    describe("Gagal add product stock diisi angka minus", () => {
        test("Response add product", (done) => {
            request(app)
            .post("/products")
            .send({
                name: "Motor",
                image_url: "https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2020/05/27/3721001315.jpg",
                price: 1,
                stock: -5
            })
            .set("access_token", access_tokenAdmin)
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "Validation min on stock failed")
                    done()
                }
            }) 
        })
    })
    describe("Gagal add product stock diisi string", () => {
        test("Response add product", (done) => {
            request(app)
            .post("/products")
            .send({
                name: "Motor",
                image_url: "https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2020/05/27/3721001315.jpg",
                price: 1,
                stock: "hello"
            })
            .set("access_token", access_tokenAdmin)
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "Validation isNumeric on stock failed")
                    done()
                }
            }) 
        })
    })
    describe("Sukses update data", () => {
        test("Response update product", (done) => {
            request(app)
            .put(`/products/${id}`)
            .send({
                name: "Motor",
                image_url: "https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2020/05/27/3721001315.jpg",
                price: 1,
                stock: 1
            })
            .set("access_token", access_tokenAdmin)
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(200)
                    expect(body).toHaveProperty("data")
                    done()
                }
            }) 
        })
    })
    describe("Gagal update data access_token bukan admin", () => {
        test("Response update product", (done) => {
            request(app)
            .put(`/products/${id}`)
            .send({
                name: "Motor",
                image_url: "https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2020/05/27/3721001315.jpg",
                price: 1,
                stock: 1
            })
            .set("access_token", access_tokenCustomer)
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(401)
                    expect(body).toHaveProperty("message", "You don't have access")
                    done()
                }
            }) 
        })
    })
    describe("Gagal update data stock diisi angka minus", () => {
        test("Response update product", (done) => {
            request(app)
            .put(`/products/${id}`)
            .send({
                name: "Motor",
                image_url: "https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2020/05/27/3721001315.jpg",
                price: 1,
                stock: -1
            })
            .set("access_token", access_tokenAdmin)
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "Validation min on stock failed")
                    done()
                }
            }) 
        })
    })
    describe("Gagal update data stock diisi string", () => {
        test("Response update product", (done) => {
            request(app)
            .put(`/products/${id}`)
            .send({
                name: "Motor",
                image_url: "https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2020/05/27/3721001315.jpg",
                price: 1,
                stock: "hello"
            })
            .set("access_token", access_tokenAdmin)
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "Validation isNumeric on stock failed")
                    done()
                }
            }) 
        })
    })
    describe("Gagal update data price diisi angka minus", () => {
        test("Response update product", (done) => {
            request(app)
            .put(`/products/${id}`)
            .send({
                name: "Motor",
                image_url: "https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2020/05/27/3721001315.jpg",
                price: -1,
                stock: 10
            })
            .set("access_token", access_tokenAdmin)
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "Validation min on price failed")
                    done()
                }
            }) 
        })
    })
    describe("Delete data sukses", () => {
        test("Response delete product", (done) => {
            request(app)
            .delete(`/products/${id}`)
            .set("access_token", access_tokenAdmin)
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(200)
                    expect(body).toHaveProperty("message", "Task success to delete")
                    done()
                }
            }) 
        })
    })
    describe("Gagal delete data tidak ada access_token", () => {
        test("Response delete product", (done) => {
            request(app)
            .delete(`/products/${id}`)
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(401)
                    expect(body).toHaveProperty("message", "You haven't login yet")
                    done()
                }
            }) 
        })
    })
    describe("Gagal delete data access_token role bukan admin", () => {
        test("Response delete product", (done) => {
            request(app)
            .delete(`/products/${id}`)
            .set("access_token", access_tokenCustomer)
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(401)
                    expect(body).toHaveProperty("message", "You don't have access")
                    done()
                }
            }) 
        })
    })
})


