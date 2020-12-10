const request = require("supertest")
const app = require("../app")
const { sequelize, User } = require("../models")
const { queryInterface } = sequelize
const { getToken } = require("../helper/generateToken")

let tokenCustomer = ""
let tokenAdmin = ""
let customer = ""
let admin = ""
let productId = ""

beforeAll((done) => {
    User.create({
        email: "arfafa@mail.com",
        password: "arfafa"
    })
    .then(data => {
        customer = data
        return User.create({
            email: "admin@mail.com",
            password: "123456",
            role: "admin"
        })
    })
    .then(data => {
        admin = data
        tokenCustomer = getToken({id: customer.id, email: customer.email})
        tokenAdmin = getToken({id: admin.id, email: admin.email})
        done()
    })
    .catch(err => {
        done(err)
    })
})

afterAll((done) => {
    queryInterface.bulkDelete("Products")
        .then(data => {
            done()
        })
        .catch(err => {
            done(err)
        })
})

let payload = {
    name: "jam",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8kKcRFYKjVBSBvRc2EpUmI3bB2n9gk-X6EWIDqVlGDgDKSUqsy4wkEiRCdNXM1Wtmi-Z7SpOJ&usqp=CAc",
    price: 11000,
    stock: 6
}

describe("POST Pruduct", () => {
    describe("Success", () => {
        test("Success POST Product", (done) => {
            request(app)
            .post("/product")
            .set("access_token", tokenAdmin)
            .send(payload)
            .end((err, res) => {
                const { body, status } = res
                if(err) {
                    return done(err)
                }
                console.log(body, "<<<< hasoj")
                productId = body.id
                expect(status).toBe(201)
                expect(body).toHaveProperty("name", payload.name)
                expect(body).toHaveProperty("image_url", payload.image_url)
                expect(body).toHaveProperty("price", payload.price)
                expect(body).toHaveProperty("stock", payload.stock)
                done()
            })
        })
    })

    describe("Success", () => {
        test("Error POST Product where using customer", (done) => {
            request(app)
            .post("/product")
            .set("access_token", tokenCustomer)
            .send(payload)
            .end((err, res) => {
                const { body, status } = res
                if(err) {
                    return done(err)
                }
                // console.log(body, "<<<< hasoj")
                expect(status).toBe(401)
                expect(body).toHaveProperty("msg", "You Are Not Authorized")
                done()
            })
        })
    })

    describe("Error", () => {
        test("Error POST Product when name ''", (done) => {
            request(app)
            .post("/product")
            .set("access_token", tokenAdmin)
            .send({
                name: "",
                image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8kKcRFYKjVBSBvRc2EpUmI3bB2n9gk-X6EWIDqVlGDgDKSUqsy4wkEiRCdNXM1Wtmi-Z7SpOJ&usqp=CAc",
                price: 11000,
                stock: 6
            })
            .end((err, res) => {
                const { body, status } = res
                if(err) {
                    return done(err)
                }
                // console.log(body, "<<<< hasoj")
                expect(status).toBe(400)
                expect(body).toHaveProperty("msg", "name can't be empty")
                done()
            })
        })
    })

    describe("Error", () => {
        test("Error POST Product when image_url ''", (done) => {
            request(app)
            .post("/product")
            .set("access_token", tokenAdmin)
            .send({
                name: "jam",
                image_url: "",
                price: 11000,
                stock: 6
            })
            .end((err, res) => {
                const { body, status } = res
                if(err) {
                    return done(err)
                }
                // console.log(body, "<<<< hasoj")
                expect(status).toBe(400)
                expect(body).toHaveProperty("msg", "image_url can't be empty")
                done()
            })
        })
    })

    describe("Error", () => {
        test("Error POST Product when price not number", (done) => {
            request(app)
            .post("/product")
            .set("access_token", tokenAdmin)
            .send({
                name: "jam",
                image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8kKcRFYKjVBSBvRc2EpUmI3bB2n9gk-X6EWIDqVlGDgDKSUqsy4wkEiRCdNXM1Wtmi-Z7SpOJ&usqp=CAc",
                price: "sembilan",
                stock: 6
            })
            .end((err, res) => {
                const { body, status } = res
                if(err) {
                    return done(err)
                }
                // console.log(body, "<<<< hasoj")
                expect(status).toBe(400)
                expect(body).toHaveProperty("msg", "accepts only numbers")
                done()
            })
        })
    })

    describe("Error", () => {
        test("Error POST Product when price less than equal 10000", (done) => {
            request(app)
            .post("/product")
            .set("access_token", tokenAdmin)
            .send({
                name: "jam",
                image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8kKcRFYKjVBSBvRc2EpUmI3bB2n9gk-X6EWIDqVlGDgDKSUqsy4wkEiRCdNXM1Wtmi-Z7SpOJ&usqp=CAc",
                price: 9000,
                stock: 6
            })
            .end((err, res) => {
                const { body, status } = res
                if(err) {
                    return done(err)
                }
                // console.log(body, "<<<< hasoj")
                expect(status).toBe(400)
                expect(body).toHaveProperty("msg", "price minimun 10000")
                done()
            })
        })
    })

    describe("Error", () => {
        test("Error POST Product when stock less than equal 5", (done) => {
            request(app)
            .post("/product")
            .set("access_token", tokenAdmin)
            .send({
                name: "jam",
                image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8kKcRFYKjVBSBvRc2EpUmI3bB2n9gk-X6EWIDqVlGDgDKSUqsy4wkEiRCdNXM1Wtmi-Z7SpOJ&usqp=CAc",
                price: 10000,
                stock: 3
            })
            .end((err, res) => {
                const { body, status } = res
                if(err) {
                    return done(err)
                }
                // console.log(body, "<<<< hasoj")
                expect(status).toBe(400)
                expect(body).toHaveProperty("msg", "stock min 5")
                done()
            })
        })
    })
})

describe("GET Product", () => {
    describe("Success Get Data", () => {
        test("Get All Data", (done) => {
            request(app)
            .get("/product")
            .set("access_token", tokenAdmin)
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(200)
                expect(body).toEqual(expect.any(Array))
                done()
            })
        })
    })
})

const payloadUpdate = {
        name: "aneh",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8kKcRFYKjVBSBvRc2EpUmI3bB2n9gk-X6EWIDqVlGDgDKSUqsy4wkEiRCdNXM1Wtmi-Z7SpOJ&usqp=CAc",
        price: 20000,
        stock: 6
    }

describe("PUT Product", () => {
    describe("Success", () => {
        test("succes update product", (done) => {
            request(app)
            .put(`/product/${productId}`)
            .set("access_token", tokenAdmin)
            .send(payloadUpdate)
            .end((err, res) => {
                const { body, status } = res
                if(err) {
                    return done(err)
                }
                console.log(payloadUpdate)
                console.log(body, productId, "<<<<<< hello world")
                expect(status).toBe(200)
                // expect(body).toEqual(payloadUpdate)
                expect(body).toHaveProperty("name", payloadUpdate.name)
                expect(body).toHaveProperty("image_url", payloadUpdate.image_url)
                expect(body).toHaveProperty("price", payloadUpdate.price)
                expect(body).toHaveProperty("stock", payloadUpdate.stock)
                done()
            })
        })

        describe("Error", () => {
            test("error update product when customer", (done) => {
                request(app)
                .put(`/product/${productId}`)
                .set("access_token", tokenCustomer)
                .send(payloadUpdate)
                .end((err, res) => {
                    const { body, status } = res
                    if(err) {
                        return done(err)
                    }
                    // console.log(body, productId, "<<<<<< hello world")
                    expect(status).toBe(401)
                    expect(body).toHaveProperty("msg", "You Are Not Authorized")
                    done()
                })
            })
        })
    })
})