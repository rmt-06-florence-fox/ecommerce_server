const request = require('supertest')
const { post } = require('../app.js')
const app = require('../app.js')
const {sequelize} = require('../models') 
const queryInterface = sequelize.getQueryInterface();
const exampleToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBvbmRlbEBnbWFpbC5jb20iLCJ1c2VyTmFtZSI6InBvbmRzIiwiZnVsbE5hbWUiOiJQb25kZWwiLCJpZCI6MjIsImlhdCI6MTYwNzM2MTcyNH0.l0C0M7Ylchs8o6QcNbDqrFMBIvjbdUqkVrs2ncuQPaI"


afterAll(() => {
    queryInterface.bulkDelete('Products', null, {})
})


describe('testing response in case submitting correct product data', () => {
    test(`product should be :
        1. stock is not negative,
        2. name chars at least 3,
        3. imageUrl is URL format, 
        4. minimum price is 1`, done => {

        request(app)
            .post('/products')
            .set('Accept', 'application/json')
            .set({ 'access_token': exampleToken })
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

describe('testing error response when submittin data in case : ', () => {
    test('name is empty', done => {
        request(app)
            .post('/products')
            .set('Accept', 'application/json')
            .set({ 'access_token': exampleToken })
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

    test('imageUrl format is not correct', done => {
        request(app)
            .post('/products')
            .set('Accept', 'application/json')
            .set({ 'access_token': exampleToken })
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

    test('price is zero', done => {
        request(app)
            .post('/products')
            .set('Accept', 'application/json')
            .set({ 'access_token': exampleToken })
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

    test('stock is negative', done => {
        request(app)
            .post('/products')
            .set('Accept', 'application/json')
            .set({ 'access_token': exampleToken })
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

describe('testing for fetching products', () => {
    test('using the correct access_token', done => {
        request(app)
        .get('/products')
        .set({'access_token': exampleToken})
        .end((err, res) => {
            if(err) done(err)
            expect(res.status).toBe(200)
            done()
        })
    })

})