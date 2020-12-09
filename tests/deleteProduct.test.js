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

describe("DELETE /products/:id", () => {
    // Sukses delete product
    test("Succes to delete product /product/:id", (done => {
        request(app)
        .delete("/products/"+productId)
        .set("acces_token", acces_token)
        .end(function (err, res) {
            if(err) {
                done(err)
            }else {
                const { body, status } = res
                expect(body).toHaveProperty("The_number_of_destroyed_rows", 1)
                expect(status).toBe(200)
                done()
            }
        })
    }))

    // Gagagl karena tidak menyertakan acces_token
    test("Failed to delete product /product/:id", (done => {
        request(app)
        .delete("/products/"+productId)
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
    test("Failed to delete product /product", (done => {
        request(app)
        .delete("/products")
        .set("acces_token", acces_tokenCustomer)
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
})