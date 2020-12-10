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


     



