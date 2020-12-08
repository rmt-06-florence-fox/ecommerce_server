const request = require('supertest')
const app = require('../app.js')
const { sequelize, Product } = require('../models')
const queryInterface = sequelize.getQueryInterface()
const Helper = require('../helpers')

let adminToken
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

describe('success deleting case', () => {
    test(`Using ADMIN token and deleting an existing product should respond with
    status  : 200 
    response body : has property "message" telling user that "product has been deleted"`, done => {
        request(app)
            .delete('/products/' + id)
            .set('Accept', 'application/json')
            .set('access_token', adminToken)
            .send({stock : 102742})
            .end((err, res) => {
                if(err) done(err)

                expect(res.body).toHaveProperty("message", "product has been deleted successfully")
                expect(res.status).toBe(200)
                done()
            })
    })
})

describe('fail deleting case', () => {
    test('using CUSTOMER token should respond telling user that she/he is not authorized', done => {
        request(app)
            .delete('/products/' + id)
            .set('Accept', 'application/json')
            .set('access_token', customerToken)
            .send({ stock: 102742 })
            .end((err, res) => {
                if (err) done(err)

                expect(res.body).toHaveProperty("messages", [
                    "You are not authorized, this route can only be accessed by admin"
                ])
                expect(res.status).toBe(401)
                done()

            })
    })

    test('using ADMIN but invalid id / product doesnt exist', done => {
        request(app)
            .delete('/products/' + id)
            .set('Accept', 'application/json')
            .set('access_token', adminToken)
            .send({ stock: 102742 })
            .end((err, res) => {
                if (err) done(err)

                expect(res.body).toHaveProperty("messages", [
                    "You are deleting product that doesn't exist"
                ])
                expect(res.status).toBe(404)
                done()

            })
    })
        
})