const request = require ("supertest")
const app = require ("../app")
const {sequelize} = require ('../models')
const {queryInterface} = sequelize
const { generateToken } = require ('../helpers/jwt.js')
const {User} = require ("../models")

let productId = 0
let userId = 0
let access_token_admin = ""
let access_token_customer = ""
let productAttributes = {
    name : "laneige toner",
    price : 200000,
    image_url : "data:image/jpeg",
    stock : 2,
    UserId : userId
}

beforeAll (done => {
    User.findOne({where : {email: 'admin@mail.com'}})
    .then(admin => {
    userId = admin.id
    access_token_admin = generateToken({
        id : admin.id, 
        email: admin.email, 
        role: admin.role
    })
    return User.findOne({where : {email: "customer@mail.com"}})
    })
    .then(customer => {
        //Karena tidak seed data customer
        access_token_customer = generateToken({
            id : customer.id, 
            email: customer.email, 
            role: customer.role
        })
        done()
    })
    .catch(err => {
        done(err)
    })
}) 
 
afterAll (done => {
    queryInterface
    .bulkDelete("Products")
    .then(response => {
        done ()
    })
    .catch (err => {
        done (err)
    })
})

describe ("Create Product POST /products", ()=> {
    test ("Success Create Data", done => {
        request (app)
        .post (`/products`)
        .set('access_token', access_token_admin)
        .send (productAttributes)
        .end ((err, res) => {
            const {body, status} = res
            productId = body.id
            if (err){
                return done (err)
            }
            expect(status).toBe(201)
            expect(body).toHaveProperty("id", productId)
            expect(body).toHaveProperty("name", productAttributes.name)
            expect(body).toHaveProperty("price", productAttributes.price)
            expect(body).toHaveProperty("image_url", productAttributes.image_url)
            expect(body).toHaveProperty("stock", productAttributes.stock)
            expect(body).toHaveProperty("UserId", userId)
            done ()
        })
    })
    test ("Response Error Not Authorized ", done => {
        request (app)
        .post (`/products`)
        .set('access_token', access_token_customer)
        .send (productAttributes)
        .end ((err, res) => {
            const {body, status} = res
            if (err){
                return done (err)
            }
            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "You are not authorize Edited the Product")
            done ()
        })
    })
})

describe ("Read Product GET /products", ()=> {
    test ("Success Read Data (Admin)", done => {
        request (app)
        .get (`/products`)
        .set('access_token', access_token_admin)
        .end ((err, res) => {
            const {body, status} = res
            if (err){
                return done (err)
            }
            expect(status).toBe(200)
            expect(body).arrayContaining
            done ()
        })
    })
    test ("Success Read Data (Customer)", done => {
        request (app)
        .get (`/products`)
        .set('access_token', access_token_customer)
        .end ((err, res) => {
            const {body, status} = res
            if (err){
                return done (err)
            }
            expect(status).toBe(200)
            expect(body).arrayContaining
            done ()
        })
    })
})

describe ("Update Product PUT /products/:id", ()=> {
    test ("Success Update Data", done => {
        request (app)
        .put (`/products/${productId}`)
        .set('access_token', access_token_admin)
        .send (productAttributes)
        .end ((err, res) => {
            const {body, status} = res
            if (err){
                return done (err)
            }
            expect(status).toBe(200)
            expect(body).toHaveProperty("id", productId)
            expect(body).toHaveProperty("name", productAttributes.name)
            expect(body).toHaveProperty("price", productAttributes.price)
            expect(body).toHaveProperty("image_url", productAttributes.image_url)
            expect(body).toHaveProperty("stock", productAttributes.stock)
            expect(body).toHaveProperty("UserId", userId)
            done ()
        })
    })

    test ("Error Update Data Wrong Id", done => {
        request (app)
        .put (`/products/15`)
        .set('access_token', access_token_admin)
        .send (productAttributes)
        .end ((err, res) => {
            const {body, status} = res
            if (err){
                return done (err)
            }
            expect(status).toBe(404)
            expect(body).toHaveProperty("message", "Product Not Found on your list")
            done ()
        })
    })

    test ("Error Update Data Not Authorize", done => {
        request (app)
        .put (`/products/${productId}`)
        .set('access_token', access_token_customer)
        .send (productAttributes)
        .end ((err, res) => {
            const {body, status} = res
            if (err){
                return done (err)
            }
            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "You are not authorize Edited the Product")
            done ()
        })
    })

})

describe ("Delete Product DELETE /products/:id", ()=> {
    test ("Error DELETE Data Wrong Id", done => {
        request (app)
        .delete (`/products/15`)
        .set('access_token', access_token_admin)
        .end ((err, res) => {
            const {body, status} = res
            if (err){
                return done (err)
            }
            expect(status).toBe(404)
            expect(body).toHaveProperty("message", "Product Not Found on your list")
            done ()
        })
    })

    test ("Error Delete Data Not Authorize", done => {
        request (app)
        .delete (`/products/${productId}`)
        .set('access_token', access_token_customer)
        .end ((err, res) => {
            const {body, status} = res
            if (err){
                return done (err)
            }
            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "You are not authorize Edited the Product")
            done ()
        })
    })

    test ("Success Delete Data", done => {
        request (app)
        .delete (`/products/${productId}`)
        .set('access_token', access_token_admin)
        .end ((err, res) => {
            const {body, status} = res
            if (err){
                return done (err)
            }
            expect(status).toBe(200)
            expect(body).toHaveProperty("message", `Product with id ${productId} Success to Delete`)
            done ()
        })
    })
})

     



