const request = require('supertest')
const app = require('../app.js')
const {sequelize} = require('../models') 
const queryInterface = sequelize.getQueryInterface()
const Helper = require('../helpers')

let adminToken
let wrongToken
let customerToken


afterAll(async (done) =>  {
    try {
        await queryInterface.bulkDelete('Products', null, {})
        await queryInterface.bulkDelete('Users', null, {})
        done()
    } catch(err){
        //console.log(err)
        done(err)
    }

})

beforeAll(async (done) =>  {
    const data = require('../seedingData/users.json')
    data.forEach(d => {
        d.createdAt = new Date()
        d.updatedAt = new Date()
        d.password = Helper.hash(d.password)
    })

    try {
        await queryInterface.bulkInsert("Users", data, {}, {})
        request(app)
            .post('/login')
            .set('Accept', 'application/json')
            .send({
                "email": "pondel@gmail.com",
                "password": "rahasia"
            })
            .end((err, res) => {
                if (err) done(err)

                const {body} = res
                adminToken = body.access_token
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
                if (err)  done(err)

                const { body } = res
                customerToken = body.access_token
                done() 
            })

    } catch (err) {
        console.log(err)
    }
})

describe('POST /products', () => {
    test(`product should be :
        1. stock is not negative,
        2. name chars at least 3,
        3. imageUrl is URL format, 
        4. minimum price is 1
        5. User is admin`, done => {

        request(app)
            .post('/products')
            .set('Accept', 'application/json')
            .set({ 'access_token': adminToken })
            .send({
                name : "Buku JS",
                imageUrl:"https://intip.in/ysgE",
                price : 2e5,
                stock : 100
            })
            .end((err, res) => {
                if(err) return done(err)

                const {body, status} = res
                expect(body).toHaveProperty("name", "Buku JS")
                expect(status).toBe(201)
                return done()
            })
    })
})

describe('error response for  POST /products in case : ', () => {
    test(`IF name is empty THEN 
        messages  : ['There should be at least 3 characters in product's name'] 
        status code : 400`, done => {
        request(app)
            .post('/products')
            .set('Accept', 'application/json')
            .set({ 'access_token': adminToken })
            .send({
                name: "",
                imageUrl: "https://intip.in/ysgE",
                price: 2e5,
                stock: 100
            })
            .end((err, res) => {
                if (err) return done(err)

                const { body, status } = res
                expect(body).toHaveProperty("messages", [
                    "There should be at least 3 characters in product's name"
                ])
                expect(status).toBe(400)
                return done()
            })
    })

    test(`imageUrl format is not correct THEN
            messges : [ "Please submit the correct image's url format"]
            status code : 400`, done => {
        request(app)
            .post('/products')
            .set('Accept', 'application/json')
            .set({ 'access_token': adminToken })
            .send({
                name: "Buku JS",
                imageUrl: "httasjkbfkajsb",
                price: 2e5,
                stock: 100
            })
            .end((err, res) => {
                if (err) return done(err)

                const { body, status } = res
                expect(body).toHaveProperty("messages", [
                    "Please submit the correct image's url format"
                ])
                expect(status).toBe(400)
                return done()
            })
    })

    test(`IF price is zero THEN
            messages : ["Price cannot be less than 1"]
            status code : 400
            `, done => {
        request(app)
            .post('/products')
            .set('Accept', 'application/json')
            .set({ 'access_token': adminToken })
            .send({
                name: "Buku JS",
                imageUrl: "https://intip.in/ysgE",
                price: 0,
                stock: 100
            })
            .end((err, res) => {
                if (err) return done(err)

                const { body, status } = res
                expect(body).toHaveProperty("messages", [
                    "Price cannot be less than 1"
                ])
                expect(status).toBe(400)
                return done()
            })
    })

    test(`IF stock is negative THEN
            messages : ["Stock cannot be negative !"]
            status code : 400
        `, done => {
        request(app)
            .post('/products')
            .set('Accept', 'application/json')
            .set({ 'access_token' : adminToken })
            .send({
                name: "Buku JS",
                imageUrl: "https://intip.in/ysgE",
                price: 2e5,
                stock: -1
            })
            .end((err, res) => {
                if (err) return done(err)

                const { body, status } = res
                expect(body).toHaveProperty("messages", [
                    "Stock cannot be negative !"
                ])
                expect(status).toBe(400)
                return done()
            })
    })
})

describe('GET /products', () => {
    test('using the correct access_token the response status should be 200', done => {
        request(app)
            .get('/products')
            .set({'access_token': adminToken})
            .end((err, res) => {
                if(err) done(err)
                expect(res.status).toBe(200)
                done()
            })
    })

    test('using the wrong access_token the status code should be 403 with messages :["you are not authenticated, token is unknown"]', done => {
        request(app)
            .get('/products')
            .set({ 'access_token': wrongToken })
            .end((err, res) => {
                if (err) done(err)
                
                expect(res.body).toHaveProperty('messages', [
                    "you are not authenticated, token is unknown"
                ])
                expect(res.status).toBe(403)
                done()
            })
    })

    test('using customer access_token the status code should be 200', done => {
        request(app)
            .get('/products')
            .set({ 'access_token': customerToken })
            .end((err, res) => {
                if (err) done(err)
                expect(res.status).toBe(200)
                done()
            })
    })

})

//describe('PUT /products/:id', () => {
//    test('using the admin access_token the status response should be 200', done => {
//        request(app)
//            .put('/products/1')
//            .set({ 'access_token': adminToken })
//            .end((err, res) => {
//                if (err) done(err)

//                expect(res.status).toBe(200)
//                done()
//            })
//    })
//})

