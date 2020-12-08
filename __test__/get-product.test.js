const request = require('supertest')
const app = require('../app.js')
const { sequelize } = require('../models')
const queryInterface = sequelize.getQueryInterface()
const Helper = require('../helpers')

let adminToken
let wrongToken
let customerToken


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

                const { body } = res
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
                if (err) done(err)

                const { body } = res
                customerToken = body.access_token
                done()
            })

    } catch (err) {
        console.log(err)
    }
})


describe('GET /products', () => {
    test('using the correct access_token the response status should be 200', done => {
        request(app)
            .get('/products')
            .set({ 'access_token': adminToken })
            .end((err, res) => {
                if (err) done(err)
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