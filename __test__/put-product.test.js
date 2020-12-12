const request = require('supertest')
const app = require('../app.js')
const { sequelize, Product } = require('../models')
const queryInterface = sequelize.getQueryInterface()
const Helper = require('../helpers')

let adminToken
let wrongToken
let customerToken
let id //untuk request


afterAll(async (done) => {
    try {
        await queryInterface.bulkDelete('Products', null, {})
        await queryInterface.bulkDelete('Users', null, {})
        done()
    } catch (err) {
        //console.log(err)
        done(err)
    }

})

beforeAll(async (done) => {
    const users = require('../seedingData/users.json')
    const seedProduct = {
        "name": "Vue Book",
        "imageUrl": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1482351633l/33509635.jpg",
        "price": 1e6,
        "stock": 200
    }

    users.forEach(user => {
        user.createdAt = new Date()
        user.updatedAt = new Date()
        user.password = Helper.hash(user.password)
    })

    
    try {
        await queryInterface.bulkInsert("Users", users, {}, {})

        const product = await Product.create(seedProduct, { returning: true })
        id = product.id
        request(app)
            .post('/login')
            .set('Accept', 'application/json')
            .send({
                "email": "pondel@gmail.com",
                "password": "rahasia"
            })
            .end((err, res) => {
                console.log(err, '<<<< ini errrrr', res.body, '<<<<<<< ini err dan res')
                if (err)  done(err)

                const { body } = res
                adminToken = body.access_token
                //console.log(adminToken)
                wrongToken = 'asfbnsioab' + adminToken
                done()
            })

        request(app)
            .post('/login')
            .set('Accept', 'application/json')
            .send({
                "email": "hndrbs153@gmail.com",
                "password": "rahasia"
            })
            .end((err, res) => {
                if (err) done(err)

                const { body } = res
                customerToken = body.access_token
                done()
            })

    } catch (err) {
        console.log(err)
    }
})

describe('PUT /products/:id', () => {   
  
    describe('success case', () => {

        test('using the ADMIN access_token the status response should be 200', done => {
            request(app)
                .put('/products/' + id)
                .set({ 'access_token': adminToken })
                .send({
                    name: "Mie Ayam",
                    imageUrl: "https://intip.in/ysgE",
                    price: 1e5,
                    stock: 200
                })
                .end((err, res) => {
                    if (err) done(err)

                    expect(res.status).toBe(200)
                    done()
                })
        })

    })

    describe('error case', () => {

        test(`using the CUSTOMER access_token response should be an error with 
        messages : [ "You are not authorized, this route can only be accessed by admin"],
        status code : 401`, done => {
            request(app)
                .put('/products/' + id)
                .set({ 'access_token': customerToken })
                .send({
                    name: "Mie Ayam",
                    imageUrl: "https://intip.in/ysgE",
                    price: 1e5,
                    stock: 200
                })
                .end((err, res) => {
                    if (err) done(err)

                    expect(res.status).toBe(401)
                    expect(res.body).toHaveProperty("messages", [
                        "You are not authorized, this route can only be accessed by admin"
                    ])
                    done()
                })
        })

        describe('using ADMIN token but invalid submitted data', () => {
            
            test(`IF stock value is negaive, then it should respond error
            messages : ["Stock cannot be negative !"]
            status code : 400`, done => {
                request(app)
                    .put('/products/' + id)
                    .set({ 'access_token': adminToken })
                    .send({
                        name: "Mie Ayam",
                        imageUrl: "https://intip.in/ysgE",
                        price: 1e5,
                        stock: -1
                    })
                    .end((err, res) => {
                        if (err) done(err)

                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty("messages", [
                            "Stock cannot be negative !"
                        ])
                        done()
                    })
            })

            test(`IF price value is negaive, then it should respond error
            messages : ["Price cannot be less than 1"]
            status code : 400`, done => {
                request(app)
                    .put('/products/' + id)
                    .set({ 'access_token': adminToken })
                    .send({
                        name: "Mie Ayam",
                        imageUrl: "https://intip.in/ysgE",
                        price: -1,
                        stock: 10
                    })
                    .end((err, res) => {
                        if (err) done(err)

                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty("messages", [
                            "Price cannot be less than 1"
                        ])
                        done()
                    })
            })

            test(`IF stock is STRING, then it should respond error
            messages : ["Stock must be INTEGER !"]
            status code : 400`, done => {
                request(app)
                    .put('/products/' + id)
                    .set({ 'access_token': adminToken })
                    .send({
                        name: "Mie Ayam",
                        imageUrl: "https://intip.in/ysgE",
                        price: 4000,
                        stock: "iob"
                    })
                    .end((err, res) => {
                        if (err) done(err)

                        expect(res.body).toHaveProperty("messages", [
                            "Stock must be INTEGER !"
                        ])
                        expect(res.status).toBe(400)
                        done()
                    })
            })
        })
    })
})
