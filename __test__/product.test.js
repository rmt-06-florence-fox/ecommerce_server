const request = require('supertest');
const app = require('../index')
const { sequelize } = require('../models')
const { hashPassword } = require('../helpers/bcryptjs')
let id
const customer_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJjb250b2hAbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MDc0MDI0ODl9.k3diZSMBKkqBiL6Jpu3Kz7IsbNzzSqNfL0tbmbpX32c'
const admin_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYwNzM1ODM4MX0.W8wCKFzFjgebTtM5wz21ZE-77CFss5Jf5ddkGskoXPk'
const wrong_token = 'this is wrong token'

beforeAll(done => {
    sequelize.queryInterface.bulkInsert('Products', [
        {
            name: 'Nintendo Switch',
            price: 4800000,
            image_url: 'https://source.unsplash.com/random',
            stock: 5,
            CategoryId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Buku Sinar Dunia',
            price: 43000,
            image_url: 'https://source.unsplash.com/random',
            stock: 99,
            CategoryId: 4,
            createdAt: new Date(),
            updatedAt: new Date()
        },
    ], {})
    .then(data => {
        return sequelize.queryInterface.bulkInsert('Users', [
            {
                email: 'admin@mail.com',
                password: hashPassword('admin123'),
                role: 'admin',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                email: 'customer@nyasar.com',
                password: hashPassword('customer123'),
                role: 'customer',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
              email: 'contoh@mail.com',
              password: hashPassword('contoh'),
              role: 'customer',
              createdAt: new Date(),
              updatedAt: new Date()
            }
        ], {})
    })
    .then(data => {
        done()
    })
    .catch(err => done(err))
})

afterAll(done => {
    sequelize.queryInterface.bulkDelete('Products', null, {})
    .then(data => {
        return sequelize.queryInterface.bulkDelete('Users', null, {})
    })
    .then(data => {
        done()
        sequelize.close()
    })
    .catch(err => {
        done(err)
    })
})

describe(`GET /products`, () => {
    test(`Success`, (done) => {
        request(app)
            .get('/products')
            .set('access_token', admin_token)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(200)
                expect(res.body).toHaveProperty(['products', 0, 'name'], 'Nintendo Switch')
                id = res.body.products[0].id
                done()
            })
    })

    test(`Wrong Token`, (done) => {
        request(app)
            .get('/products')
            .set('access_token', wrong_token)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('message', 'Please Login First')
                done()
            })
    })
})

describe(`POST /products`, () => {
    test(`Success`, (done) => {
        request(app)
            .post('/products')
            .set('access_token', admin_token)
            .send({
                name: `Helm Mahal Lapis Emas`,
                price: 300000,
                stock: 3,
                CategoryId: 3
            })
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(200)
                expect(res.body).toHaveProperty(['product', 'name'], 'Helm Mahal Lapis Emas')
                done()
            })
    })

    test(`Wrong Token`, (done) => {
        request(app)
            .post('/products')
            .set('access_token', wrong_token)
            .send({
                name: `Helm Mahal Lapis Emas`,
                price: 300000,
                stock: 3,
                CategoryId: 3
            })
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('message', 'Please Login First')
                done()
            })
    })

    test(`Need product name`, (done) => {
        request(app)
            .post('/products')
            .set('access_token', admin_token)
            .send({
                price: 300000,
                stock: 3,
                CategoryId: 3
            })
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('message', 'Product Name Required')
                done()
            })
    })
})

describe(`PUT /products/:id`, () => {
    test(`Success`, (done) => {
        request(app)
            .put(`/products/${id}`)
            .set('access_token', admin_token)
            .send({
                name: `Helm Murahan Ternyata`,
                price: 59900
            })
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(200)
                expect(res.body).toHaveProperty(['product', 'name'], 'Helm Murahan Ternyata')
                done()
            })
    })
})

describe(`DELETE /products/:id`, () => {
    test(`Success`, (done) => {
        request(app)
            .delete(`/products/${id}`)
            .set('access_token', admin_token)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(200)
                expect(res.body).toHaveProperty('message', 'Product Deleted Successfully')
                done()
            })
    })
    test(`Wrong Token`, (done) => {
        request(app)
            .delete(`/products/${id}`)
            .set('access_token', wrong_token)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('message', 'Please Login First')
                done()
            })
    })
    test(`Login Using Customer`, (done) => {
        request(app)
            .delete(`/products/${id}`)
            .set('access_token', customer_token)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('message', "You're Unauthorized To Do This")
                done()
            })
    })
})