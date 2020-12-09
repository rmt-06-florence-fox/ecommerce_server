const request = require('supertest')
const { User, Product } = require("../models/index")
const app = require("../app")
const { sequelize } = require("../models/index")
const { queryInterface } = sequelize
let { createToken } = require("../helpers/accesToken")
let acces_token;
let acces_tokenCustomer;
let productId;

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
            return Product.create({
                name: "Celana",
                image_url: "cek",
                price: 1200000,
                stock: 5
            })
            // done()
        })
        .then(data => {
            productId = data.id
            done()
        })
        .catch(err => {
            done(err)
        })
})


describe("PUT /products/:id", () => {

    test("Succes to update product /products/:id", (done => {
        request(app)
        .put("/products/"+productId)
        .set("acces_token", acces_token)
        .send({
            name: "Masker",
            image_url: "cek",
            price: 1000000,
            stock: 6
        })
        .end(function (err, res) {
            if(err) {
                done(err)
            }else {
                const { body, status } = res
                expect(status).toBe(200)
                expect(body).toHaveProperty("name", "Masker")
                expect(body).toHaveProperty("price", 1000000)
                expect(body).toHaveProperty("image_url", "cek")
                expect(body).toHaveProperty("stock", 6)
                done()
            }
        })
    }))

    // no acces_token
    test("Failed to update product /products/:id", (done => {
        request(app)
        .put("/products/"+productId)
        .send({
            name: "Masker",
            image_url: "cek",
            price: 1000000,
            stock: 6
        })
        .end(function (err, res) {
            if(err) {
                console.log(err)
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
    test("Failed update product /products/:id", (done => {
        request(app)
        .put("/products/"+productId)
        .set("acces_token", acces_tokenCustomer)
        .send({
            name: "Masker",
            image_url: "cek",
            price: 1000000,
            stock: 6
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

    // field required diisi tapi tidak sesuai require
    test("Failed update product /products/:id", (done => {
        request(app)
        .put("/products/"+productId)
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
                done()
            }
        })
    }))



})