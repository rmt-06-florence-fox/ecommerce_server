const request = require('supertest')
const { User, Product } = require("../models/index")
const app = require("../app")
const { sequelize } = require("../models/index")
const { queryInterface } = sequelize
let { createToken } = require("../helpers/accesToken")
let acces_token;
let acces_tokenCustomer;

afterAll(done => {
    queryInterface.bulkDelete('Products', null, {})
        .then(data => {
        return queryInterface.bulkDelete("Users", null, {})         
        })
        .then(data => {
            done()
        })
        .catch(err => {
            done(err)
        })
    
})
    
beforeAll(done => {
    let objAdmin = {
        email: "admin@mail.com",
        password: "qwerty",
        role: "admin"
    }

    let objCustomer = {
        email: "febri@mail.com",
        password: "qwerty",
        role: "customer"
    }
    
    User.create(objAdmin)
        .then(data => {
            acces_token = createToken({ data })
            return User.create(objCustomer)
        })
        .then(data => {
            acces_tokenCustomer = createToken({data})
            done()
        })
        .catch(err => {
            done(err)
        })
})


describe("POST /products", () => {

    // berhasil add create
    test("Succes to add product /product", (done => {
        request(app)
        .post("/products/")
        .set("acces_token", acces_token)
        .send({
            name: "masker",
            image_url: "cek",
            price: 1200000,
            stock: 6
        })
        .end(function (err, res) {
            if(err) {
                done(err)
            }else {
                const { body, status } = res
                expect(body).toHaveProperty("name", "masker")
                expect(body).toHaveProperty("price", 1200000)
                expect(body).toHaveProperty("image_url", "cek")
                expect(body).toHaveProperty("stock", 6)
                expect(status).toBe(201)
                done()
            }
        })
    }))

    // tidak punya token
    test("Failed to add product /product", (done => {
        request(app)
        .post("/products")
        .send({
            name: "Gucci T-Shirt",
            image_url: "cek",
            price: 1200000,
            stock: 6
        })
        .end(function (err, res) {
            if(err) {
                done(err)
            }else {
                const { body, status } = res
                expect(status).toBe(401)
                expect(body).toBe('Wrong acces_token')
                done()
            }
        })
    }))

    // token tidak valid
    test("Failed add product /product", (done => {
        request(app)
        .post("/products")
        .set("acces_token", acces_tokenCustomer)
        .send({
            name: "Gucci T-Shirt",
            image_url: "cek",
            price: 1200000,
            stock: "6"
        })
        .end(function (err, res) {
            if(err) {
                done(err)
            }else {
                const { body, status } = res
                expect(status).toBe(400)
                expect(body.errors).toBe("Forbiden Acces")
                done()
            }
        })
    }))

    // field required tidak sesuai validate
    test("Failed add product /product", (done => {
        request(app)
        .post("/products")
        .set("acces_token", acces_token)
        .send({
            name: "",
            image_url: "cek",
            price: -1,
            stock: -1
        })
        .end(function (err, res) {
            if(err) {
                done(err)
            }else {
                const { body, status } = res
                let err = body.errors[0]
                const expected = [err];
                expect.arrayContaining(expected)
                expect(status).toBe(400)
                done()
            }
        })
    }))

})