const request = require('supertest');
const app = require('../app')
const { sequelize } = require('../models/index')
const { queryInterface } = sequelize
const { generateToken } = require("../helpers/jwt");

let access_token;
let access_token2; // untuk role yang bukan admin
let idProduct;

beforeAll((done) => {
    let payload = {
        id: "3",
        email: "admin@email.com",
        role: "admin"
    }
    let payload2 = {
        id: "6",
        email: "cst@email.com",
        role: "customer"
    }
    access_token = generateToken(payload)
    access_token2 = generateToken(payload2)
    queryInterface.bulkInsert("Products", [{
        name: "Jacket",
        image_url: "https://s1.inkuiri.net/i/large/https%2Fs1.bukalapak.com%2Fimg%2F19408929951%2Flarge%2Fdata.jpeg",
        price: 200000,
        stock: 20,
        createdAt: new Date(),
        updatedAt: new Date()
    }], { returning: true})
    .then(data => {
        idProduct = data[0].id
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
    });
})

describe("add product", () => {
    describe("success add product - POST", () => {
        test("response add product", (done) => {
            request(app)
            .post("/products")
            .send({
                name: "Jacket",
                image_url: "https://s1.inkuiri.net/i/large/https%2Fs1.bukalapak.com%2Fimg%2F19408929951%2Flarge%2Fdata.jpeg",
                price: 200000,
                stock: 20
            })
            .set("access_token", access_token)
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

    describe("error add product access_token not valid - POST", () => {
        test("response add product", (done) => {
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
                    expect(body).toHaveProperty("message", "Please Login or Register First")
                    done()
                }
            }) 
        })
    })

    describe("error add product field name & image_url empty - POST", () => {
        test("response add product failed", (done) => {
            request(app)
            .post("/products")
            .send({
                name: "",
                image_url: "",
                price: 10000,
                stock: 10
            })
            .set("access_token", access_token)
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("error", ["Name can't be empty", "image_url can't be empty"])
                    done()
                }
            }) 
        })
    })

    describe("error add product field price & stock is null - POST", () => {
        test("response add product failed", (done) => {
            request(app)
            .post("/products")
            .send({
                name: "topi",
                image_url: "https://s1.inkuiri.net/i/large/https%2Fs1.bukalapak.com%2Fimg%2F19408929951%2Flarge%2Fdata.jpeg",
                price: null,
                stock: null
            })
            .set("access_token", access_token)
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("error", ["Price can't be empty", "Stock can't be empty"])
                    done()
                }
            }) 
        })
    })

    describe("error add product field price & stock value not a number - POST", () => {
        test("response add product failed", (done) => {
            request(app)
            .post("/products")
            .send({
                name: "jacket",
                image_url: "https://s1.inkuiri.net/i/large/https%2Fs1.bukalapak.com%2Fimg%2F19408929951%2Flarge%2Fdata.jpeg",
                price: "abc",
                stock: "abc"
            })
            .set("access_token", access_token)
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("error", ["Price must be a number", "Stock must be a number value"])
                    done()
                }
            })
        })
    })

    describe("error add product field price & stock value less than 0 (nol) - POST", () => {
        test("response add product failed", (done) => {
            request(app)
            .post("/products")
            .send({
                name: "jacket",
                image_url: "https://s1.inkuiri.net/i/large/https%2Fs1.bukalapak.com%2Fimg%2F19408929951%2Flarge%2Fdata.jpeg",
                price: -1,
                stock: -1
            })
            .set("access_token", access_token)
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("error", ["not minus or equal to 0(nol) price", "Stock must graeter than 0(nol) or equal to 0(nol)"])
                    done()
                }
            })
        })
    })

    describe("error add product field price & stock value equal to 0 (nol) - POST", () => {
        test("response add product failed", (done) => {
            request(app)
            .post("/products")
            .send({
                name: "jacket",
                image_url: "https://s1.inkuiri.net/i/large/https%2Fs1.bukalapak.com%2Fimg%2F19408929951%2Flarge%2Fdata.jpeg",
                price: 0,
                stock: 0
            })
            .set("access_token", access_token)
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("error", ["not minus or equal to 0(nol) price", "Stock must graeter than 0(nol) or equal to 0(nol)"])
                    done()
                }
            })
        })
    })

    describe("error add product role not admin - POST", () => {
        test("response add product failed", (done) => {
            request(app)
            .post("/products")
            .send({
                name: "jacket",
                image_url: "https://s1.inkuiri.net/i/large/https%2Fs1.bukalapak.com%2Fimg%2F19408929951%2Flarge%2Fdata.jpeg",
                price: 15000,
                stock: 10
            })
            .set("access_token", access_token2)
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(401)
                    expect(body).toHaveProperty("message", "sory, you are not authorized to access this page")
                    done()
                }
            })
        })
    })
    // ===================================================================================================== @above - add fitur test
    describe("success show product all - GET", () => {
        test("response show product", (done) => {
            request(app)
            .get("/products")
            .set("access_token", access_token)
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(200)
                    expect(body.length).toBeGreaterThan(0);
                    done()
                }
            })
        })
    })

    describe("error show product all acces_token empty - GET", () => {
        test("response show product failed", (done) => {
            request(app)
            .get("/products")
            .set("access_token", "")
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(401)
                    expect(body).toHaveProperty("message", "Please Login or Register First")
                    done()
                }
            })
        })
    })
    // ===================================================================================================== @above - show fitur test
    describe("success update product - PUT", () => {
        test("response update product", (done) => {
            request(app)
            .put(`/products/${idProduct}`)
            .send({
                name: "jacket",
                image_url: "https://s1.inkuiri.net/i/large/https%2Fs1.bukalapak.com%2Fimg%2F19408929951%2Flarge%2Fdata.jpeg",
                price: 12000,
                stock: 30
            })
            .set("access_token", access_token)
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(200)
                    expect(body).toHaveProperty("id", idProduct)

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

    describe("error update product name & image_url - PUT", () => {
        test("response update product failed", (done) => {
            request(app)
            .put(`/products/${idProduct}`)
            .send({
                name: "",
                image_url: "",
                price: 10000,
                stock: 10
            })
            .set("access_token", access_token)
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("error", ["Name can't be empty", "image_url can't be empty"])
                    done()
                }
            }) 
        })
    })

    describe("error update product field price & stock is null - PUT", () => {
        test("response update product failed", (done) => {
            request(app)
            .put(`/products/${idProduct}`)
            .send({
                name: "topi",
                image_url: "https://s1.inkuiri.net/i/large/https%2Fs1.bukalapak.com%2Fimg%2F19408929951%2Flarge%2Fdata.jpeg",
                price: null,
                stock: null
            })
            .set("access_token", access_token)
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("error", ["Price can't be empty", "Stock can't be empty"])
                    done()
                }
            }) 
        })
    })

    describe("error update product field price & stock value not a number - PUT", () => {
        test("response update product failed", (done) => {
            request(app)
            .put(`/products/${idProduct}`)
            .send({
                name: "jacket",
                image_url: "https://s1.inkuiri.net/i/large/https%2Fs1.bukalapak.com%2Fimg%2F19408929951%2Flarge%2Fdata.jpeg",
                price: "abc",
                stock: "abc"
            })
            .set("access_token", access_token)
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("error", ["Price must be a number", "Stock must be a number value"])
                    done()
                }
            })
        })
    })

    describe("error update product field price & stock value less than 0 (nol) - PUT", () => {
        test("response update product failed", (done) => {
            request(app)
            .put(`/products/${idProduct}`)
            .send({
                name: "jacket",
                image_url: "https://s1.inkuiri.net/i/large/https%2Fs1.bukalapak.com%2Fimg%2F19408929951%2Flarge%2Fdata.jpeg",
                price: -1,
                stock: -1
            })
            .set("access_token", access_token)
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("error", ["not minus or equal to 0(nol) price", "Stock must graeter than 0(nol) or equal to 0(nol)"])
                    done()
                }
            })
        })
    })

    describe("error update product field price & stock value equal to 0 (nol) - PUT", () => {
        test("response update product failed", (done) => {
            request(app)
            .put(`/products/${idProduct}`)
            .send({
                name: "jacket",
                image_url: "https://s1.inkuiri.net/i/large/https%2Fs1.bukalapak.com%2Fimg%2F19408929951%2Flarge%2Fdata.jpeg",
                price: 0,
                stock: 0
            })
            .set("access_token", access_token)
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("error", ["not minus or equal to 0(nol) price", "Stock must graeter than 0(nol) or equal to 0(nol)"])
                    done()
                }
            })
        })
    })

    describe("error update product role not admin - PUT", () => {
        test("response update product failed", (done) => {
            request(app)
            .put(`/products/${idProduct}`)
            .send({
                name: "jacket",
                image_url: "https://s1.inkuiri.net/i/large/https%2Fs1.bukalapak.com%2Fimg%2F19408929951%2Flarge%2Fdata.jpeg",
                price: 20000,
                stock: 21
            })
            .set("access_token", access_token2)
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(401)
                    expect(body).toHaveProperty("message", "sory, you are not authorized to access this page")
                    done()
                }
            })
        })
    })
    // ===================================================================================================== @above - update fitur test
    describe("success delete product - DESTROY", () => {
        test("response delete product", (done) => {
            request(app)
            .delete(`/products/${idProduct}`)
            .set("access_token", access_token)
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(200)
                    expect(body).toHaveProperty("message", `success delete product with id ${idProduct}`)
                    done()
                }
            })
        })
    })

    describe("error delete product role not admin - DESTROY", () => {
        test("response delete product failed", (done) => {
            request(app)
            .delete(`/products/${idProduct}`)
            .set("access_token", access_token2)
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                } else {
                    expect(status).toBe(401)
                    expect(body).toHaveProperty("message", "sory, you are not authorized to access this page")
                    done()
                }
            })
        })
    })

})

