const request = require('supertest')
const app = require('../app')
const { sequelize } = require("../models")
const { queryInterface } = sequelize
const { encryptPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const {Product} = require('../models')
let token = ""
let userToken = ""
let id;
let id2;

beforeAll(done => {
    queryInterface.bulkInsert("Users", [
        {
            email: "admin@mail.com",
            password: encryptPassword("123456"),
            role: "admin",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            email: "user@mail.com",
            password: encryptPassword("123456"),
            role: "user",
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ],
    { returning: true })
    .then(user => {
        token = generateToken({
            id: user[0].id,
            email: user[0].email
        })
        userToken = generateToken({
            id: user[1].id,
            email: user[1].email
        })
        done()
    })
    .catch(err => {
        done(err)
    })

    Product.create({
        name: "PS200",
        image_url: "https://mmc.tirto.id/image/otf/500x0/2020/06/12/ps-5_ratio-16x9.jpg",
        price: 1000000,
        stock: 10
    })
    .then(data => {
        id = data.id
    })
    .catch(err => {
        console.log(err);
    })

    Product.create({
        name: "PS211",
        image_url: "https://mmc.tirto.id/image/otf/500x0/2020/06/12/ps-5_ratio-16x9.jpg",
        price: 1000000,
        stock: 10
    })
    .then(data => {
        id2 = data.id
    })
    .catch(err => {
        console.log(err);
    })
})

afterAll(done => {
    queryInterface.bulkDelete("Users")
    .then(_ => {
        done()
    })
    .catch(err => {
        done(err)
    })
    
    queryInterface.bulkDelete("Products")
    .then(_ => {
        done()
    })
    .catch(err => {
        done(err)
    })
})

describe("create Product POST /products", () => {
    describe("Success create product", () => {
        test("response with accepted body value", done => {
            request(app)
            .post("/products")
            .set("access_token", token)
            .send({
                name: "PS 5",
                image_url: "https://mmc.tirto.id/image/otf/500x0/2020/06/12/ps-5_ratio-16x9.jpg",
                price: 7500000,
                stock: 10
            })
            .end((err, res) => {
                const {body, status} = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(201)
                expect(body).toHaveProperty("name", "PS 5")
                expect(body).toHaveProperty("image_url", "https://mmc.tirto.id/image/otf/500x0/2020/06/12/ps-5_ratio-16x9.jpg")
                expect(body).toHaveProperty("price", 7500000)
                expect(body).toHaveProperty("stock", 10)
                done()
            })
        })
    })
    describe("Error Create Case There is no Access Token", () => {
        test("Failed to create because there is no access_token", done => {
            request(app)
            .post("/products")
            .send({
                name: "PS 10",
                image_url: "https://mmc.tirto.id/image/otf/500x0/2020/06/12/ps-5_ratio-16x9.jpg",
                price: 7500000,
                stock: 10
            })
            .end((err, res) => {
                const {body, status} = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty("message", "Please Login First")
                done()
            })
        })
    })
    describe("Error Create Case Role Is Not Admin", () => {
        test("Failed to create because the role is not admin", done => {
            request(app)
            .post("/products")
            .set("access_token", userToken)
            .send({
                name: "PS 12",
                image_url: "https://mmc.tirto.id/image/otf/500x0/2020/06/12/ps-5_ratio-16x9.jpg",
                price: 7500000,
                stock: 10
            })
            .end((err, res) => {
                const {body, status} = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty("message", "You Are Not Authorized")
                done()
            })
        })
    })
    describe("Error Create Case Required Field Is Empty", () => {
        test("Failed to create because the required field is empty", done => {
            request(app)
            .post("/products")
            .set("access_token", token)
            .send({
                name: "",
                image_url: "",
                price: 7500000,
                stock: 10
            })
            .end((err, res) => {
                const {body, status} = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "All fields must not be empty")
                done()
            })
        })
    })
    describe("Error Create Case Stock Filled With Minus Value", () => {
        test("Failed to create because stock filled with minus value", done => {
            request(app)
            .post("/products")
            .set("access_token", token)
            .send({
                name: "PS 10",
                image_url: "https://mmc.tirto.id/image/otf/500x0/2020/06/12/ps-5_ratio-16x9.jpg",
                price: 7500000,
                stock: -10
            })
            .end((err, res) => {
                const {body, status} = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "The stock field value must not less than 0")
                done()
            })
        })
    })
    describe("Error Create Case Price Filled With Minus Value", () => {
        test("Failed to create because price filled with minus value", done => {
            request(app)
            .post("/products")
            .set("access_token", token)
            .send({
                name: "PS 10",
                image_url: "https://mmc.tirto.id/image/otf/500x0/2020/06/12/ps-5_ratio-16x9.jpg",
                price: -7500000,
                stock: 10
            })
            .end((err, res) => {
                const {body, status} = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "The price field value must not less than 0")
                done()
            })
        })
    })
    describe("Error Create Case Mismatch Value", () => {
        test("Failed to create because field filled with mismatch value", done => {
            request(app)
            .post("/products")
            .set("access_token", token)
            .send({
                name: "PS 10",
                image_url: "https://mmc.tirto.id/image/otf/500x0/2020/06/12/ps-5_ratio-16x9.jpg",
                price: "7500000",
                stock: "asd"
            })
            .end((err, res) => {
                const {body, status} = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "Name must be a string value, image_url must be a string value, price must be a number value and stock must be a number value")
                done()
            })
        })
    })
})

describe("update Product POST /products/:id", () => {
    describe("Success Update", () => {
        test("response with body value", done => {
            request(app)
            .put(`/products/${id}`)
            .set("access_token", token)
            .send({
                name: "PS 6",
                image_url: "https://mmc.tirto.id/image/otf/500x0/2020/06/12/ps-5_ratio-16x9.jpg",
                price: 7500000,
                stock: 10
            })
            .end((err, res) => {
                const {body, status} = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(200)
                expect(body).toHaveProperty("name", "PS 6")
                expect(body).toHaveProperty("image_url", "https://mmc.tirto.id/image/otf/500x0/2020/06/12/ps-5_ratio-16x9.jpg")
                expect(body).toHaveProperty("price", 7500000)
                expect(body).toHaveProperty("stock", 10)
                done()
            })
        })
    })
    describe("Error Update Case There is no Access Token", () => {
        test("Failed to update because there is no access_token", done => {
            request(app)
            .put(`/products/${id}`)
            .send({
                name: "PS 10",
                image_url: "https://mmc.tirto.id/image/otf/500x0/2020/06/12/ps-5_ratio-16x9.jpg",
                price: 7500000,
                stock: 10
            })
            .end((err, res) => {
                const {body, status} = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty("message", "Please Login First")
                done()
            })
        })
    })
    describe("Error Update Case Role Is Not Admin", () => {
        test("Failed to update because the role is not admin", done => {
            request(app)
            .put(`/products/${id}`)
            .set("access_token", userToken)
            .send({
                name: "PS 12",
                image_url: "https://mmc.tirto.id/image/otf/500x0/2020/06/12/ps-5_ratio-16x9.jpg",
                price: 7500000,
                stock: 10
            })
            .end((err, res) => {
                const {body, status} = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty("message", "You Are Not Authorized")
                done()
            })
        })
    })
    describe("Error Update Case Stock Filled With Minus Value", () => {
        test("Failed to update because stock filled with minus value", done => {
            request(app)
            .put(`/products/${id}`)
            .set("access_token", token)
            .send({
                name: "PS 10",
                image_url: "https://mmc.tirto.id/image/otf/500x0/2020/06/12/ps-5_ratio-16x9.jpg",
                price: 7500000,
                stock: -10
            })
            .end((err, res) => {
                const {body, status} = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "The stock field value must not less than 0")
                done()
            })
        })
    })
    describe("Error Create Case Mismatch Value", () => {
        test("Failed to create because field filled with mismatch value", done => {
            request(app)
            .post("/products")
            .set("access_token", token)
            .send({
                name: "PS 10",
                image_url: "https://mmc.tirto.id/image/otf/500x0/2020/06/12/ps-5_ratio-16x9.jpg",
                price: "7500000",
                stock: "asd"
            })
            .end((err, res) => {
                const {body, status} = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "Name must be a string value, image_url must be a string value, price must be a number value and stock must be a number value")
                done()
            })
        })
    })
})

describe("delete Product Delete /products/:id", () => {
    describe("Success Delete", () => {
        test("response with message", done => {
            request(app)
            .delete(`/products/${id2}`)
            .set("access_token", token)
            .end((err, res) => {
                const {body, status} = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(200)
                expect(body).toHaveProperty("message", "Deleted Successfully")
                done()
            })
        })
    })
    describe("Error Delete Case There is no Access Token", () => {
        test("Failed to delete because there is no access_token", done => {
            request(app)
            .put(`/products/${id2}`)
            .end((err, res) => {
                const {body, status} = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty("message", "Please Login First")
                done()
            })
        })
    })
    describe("Error Delete Case Role Is Not Admin", () => {
        test("Failed to delete because the role is not admin", done => {
            request(app)
            .delete(`/products/${id2}`)
            .set("access_token", userToken)
            .end((err, res) => {
                const {body, status} = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty("message", "You Are Not Authorized")
                done()
            })
        })
    })
})