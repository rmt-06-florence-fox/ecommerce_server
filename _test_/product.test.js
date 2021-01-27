const request = require('supertest')
const app = require('../app')
const { generateToken } = require('../helpers/token')
const { encrypt } = require('../helpers/password')
const { sequelize } = require('../models/index')
const { queryInterface } = sequelize
let adminToken
let customerToken
let idProduct

beforeAll((done) => {
    queryInterface.bulkInsert('Users', [{
        email: 'admin@mail.com',
        password: encrypt('123456'),
        role: 'administrator',
        createdAt: new Date(),
        updatedAt: new Date()
    },{
        email: 'customer@mail.com',
        password: encrypt('123456'),
        role: 'customer',
        createdAt: new Date(),
        updatedAt: new Date() 
    }], {
        returning: true
    })
    .then(response => {
        adminToken = generateToken(response[0].id, response[0].email)
        customerToken = generateToken(response[1].id, response[1].email)
        done()
    })
    .catch(err => {
        done(err)
    })
})

afterAll((done) => {
    queryInterface.bulkDelete('Users', null, {})
    .then(response => {
        return queryInterface.bulkDelete('Products', null, {})
    })
    .then(response => {
        done()
    })
    .catch(err => {
        done(err)
    })
})

describe('Add Product POST /products', () => {
    describe('Add Successfull', () => {
        test('Returning created data', done => {
            request(app)
            .post('/products')
            .set('access_token', adminToken)
            .send({
                name: 'Unisex Converse Chuck Taylor All Star Classic Colour High Top White',
                image_url: 'https://www.converse.com.au/media/catalog/product/cache/83515b991e19eb33521df1bfc97686b7/c/h/chuck_taylor_all_star_classic_colour_high_top_white_17650_0.jpg',
                price: 120,
                stock: 5,
            },)
            .end((err, res) => {
                const { body, status } = res
                if(err) {
                    done(err)
                }
                expect(status).toBe(201)
                expect(body).toHaveProperty('data', {
                    id: expect.any(Number),
                    name: expect.any(String),
                    image_url: expect.any(String),
                    price: expect.any(Number),
                    stock: expect.any(Number),
                    UserId: expect.any(Number),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                })
                idProduct = body.data.id
                done()
            })
        })
    })

    describe('Add Failed', () => {
        test('Not authorized', done => {
            request(app)
            .post('/products')
            .set('access_token', customerToken)
            .send({
                name: 'Unisex Converse Chuck Taylor All Star Classic Colour High Top White',
                image_url: 'https://www.converse.com.au/media/catalog/product/cache/83515b991e19eb33521df1bfc97686b7/c/h/chuck_taylor_all_star_classic_colour_high_top_white_17650_0.jpg',
                price: 120,
                stock: 15
            })
            .end((err, res) => {
                const { status, body } = res
                if(err) {
                    done(err)
                }
                expect(status).toBe(403)
                expect(body).toHaveProperty('message', 'Authorized user only!')
                done()
            })
        })

        test('No access token', done => {
            request(app)
            .post('/products')
            .set('access_token', '')
            .send({
                name: 'Unisex Converse Chuck Taylor All Star Classic Colour High Top White',
                image_url: 'https://www.converse.com.au/media/catalog/product/cache/83515b991e19eb33521df1bfc97686b7/c/h/chuck_taylor_all_star_classic_colour_high_top_white_17650_0.jpg',
                price: 120,
                stock: 15
            })
            .end((err, res) => {
                const { status, body } = res
                if(err) {
                    done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'Please login first!')
                done()
            })
        })

        test('Empty field', done => {
            request(app)
            .post('/products')
            .set('access_token', adminToken)
            .send({
                name: '',
                image_url: '',
                price: '',
                stock: ''
            })
            .end((err, res) => {
                const { status, body } = res
                if(err) {
                    done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', 'Field cannot be empty. Please fill out all fields!')
                done()
            })
        })

        test('Negative number input', done => {
            request(app)
            .post('/products')
            .set('access_token', adminToken)
            .send({
                name: 'Unisex Converse Chuck Taylor All Star Classic Colour High Top White',
                image_url: 'https://www.converse.com.au/media/catalog/product/cache/83515b991e19eb33521df1bfc97686b7/c/h/chuck_taylor_all_star_classic_colour_high_top_white_17650_0.jpg',
                price: -500,
                stock: -3
            })
            .end((err, res) => {
                const { status, body } = res
                if(err) {
                    done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', 'Price/stock cannot be negative!')
                done()
            })
        })

        test('Invalid type input', done => {
            request(app)
            .post('/products')
            .set('access_token', adminToken)
            .send({
                name: 'Unisex Converse Chuck Taylor All Star Classic Colour High Top White',
                image_url: 'https://www.converse.com.au/media/catalog/product/cache/83515b991e19eb33521df1bfc97686b7/c/h/chuck_taylor_all_star_classic_colour_high_top_white_17650_0.jpg',
                price: 'thirty thousand',
                stock: 'infin2ite'
            })
            .end((err, res) => {
                const { status, body } = res
                if(err) {
                    done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', 'Price/stock only accept number as input!')
                done()
            })
        })
    })
})

describe('Edit Product PUT /products', () => {
    describe('Edit Successfull', () => {
        test('Returning updated data', done => {
            request(app)
            .put(`/products/${idProduct}`)
            .set('access_token', adminToken)
            .send({
                name: 'Converse High Top NavyBlue',
                image_url: 'https://www.converse.com.au/media/catalog/product/cache/83515b991e19eb33521df1bfc97686b7/c/h/chuck_taylor_all_star_classic_colour_high_top_navy_19622_0.jpg',
                price: 99,
                stock: 50,
            })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    done(err)
                }
                expect(status).toBe(200)
                expect(body).toHaveProperty('data', {
                    id: expect.any(Number),
                    name: expect.any(String),
                    image_url: expect.any(String),
                    price: expect.any(Number),
                    stock: expect.any(Number),
                    UserId: expect.any(Number),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                })
                done()
            })
        })
    })

    describe('Edit Failed', () => {
        test('Not authorized', done => {
            request(app)
            .put(`/products/${idProduct}`)
            .set('access_token', customerToken)
            .send({
                name: 'Converse High Top Black',
                image_url: 'https://www.converse.com.au/media/catalog/product/cache/83515b991e19eb33521df1bfc97686b7/c/h/chuck_taylor_all_star_classic_colour_high_top_navy_19622_0.jpg',
                price: 155,
                stock: 55,
            })
            .end((err, res) => {
                const { status, body } = res
                if(err) {
                    done(err)
                }
                expect(status).toBe(403)
                expect(body).toHaveProperty('message', 'Authorized user only!')
                done()
            })
        })

        test('No access token', done => {
            request(app)
            .put(`/products/${idProduct}`)
            .set('access_token', '')
            .send({
                name: 'NavyBlue',
                image_url: 'https://www.converse.com.au/media/catalog/product/cache/83515b991e19eb33521df1bfc97686b7/c/h/chuck_taylor_all_star_classic_colour_high_top_navy_19622_0.jpg',
                price: 155,
                stock: 22,
            })
            .end((err, res) => {
                const { status, body } = res
                if(err) {
                    done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'Please login first!')
                done()
            })
        })

        test('Negative number input', done => {
            request(app)
            .put(`/products/${idProduct}`)
            .set('access_token', adminToken)
            .send({
                name: 'Unisex Converse Chuck Taylor All Star Classic Colour High Top White',
                image_url: 'https://www.converse.com.au/media/catalog/product/cache/83515b991e19eb33521df1bfc97686b7/c/h/chuck_taylor_all_star_classic_colour_high_top_white_17650_0.jpg',
                price: -500,
                stock: -3
            })
            .end((err, res) => {
                const { status, body } = res
                if(err) {
                    done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', 'Price/stock cannot be negative!')
                done()
            })
        })

        test('Invalid type input', done => {
            request(app)
            .put(`/products/${idProduct}`)
            .set('access_token', adminToken)
            .send({
                name: 'Unisex Converse Chuck Taylor All Star Classic Colour High Top White',
                image_url: 'https://www.converse.com.au/media/catalog/product/cache/83515b991e19eb33521df1bfc97686b7/c/h/chuck_taylor_all_star_classic_colour_high_top_white_17650_0.jpg',
                price: 'thirty thousand',
                stock: 'infinite'
            })
            .end((err, res) => {
                const { status, body } = res
                if(err) {
                    done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', 'Price/stock only accept number as input!')
                done()
            })
        })

        test('Product not found', done => {
            request(app)
            .put('/products/999')
            .set('access_token', adminToken)
            .send({
                name: 'Unisex Converse Chuck Taylor All Star Classic Colour High Top White',
                image_url: 'https://www.converse.com.au/media/catalog/product/cache/83515b991e19eb33521df1bfc97686b7/c/h/chuck_taylor_all_star_classic_colour_high_top_white_17650_0.jpg',
                price: 555,
                stock: 10
            })
            .end((err, res) => {
                const { status, body } = res
                if(err) {
                    done(err)
                }
                expect(status).toBe(404)
                expect(body).toHaveProperty('message', 'Product not found!')
                done()
            })
        })
    })
})

describe('Delete Product Delete /products/:id', () => {
    describe('Delete Successfull', () => {
        test('Returning message successfull', done => {
            request(app)
            .delete(`/products/${idProduct}`)
            .set('access_token', adminToken)
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    done(err)
                }
                expect(status).toBe(200)
                expect(body).toHaveProperty('message', 'Data deleted successfully.')
                done()
            })
        })
    })

    describe('Delete Failed', () => {
        test('Not authorized', done => {
            request(app)
            .delete(`/products/${idProduct}`)
            .set('access_token', customerToken)
            .end((err, res) => {
                const { status, body } = res
                if(err) {
                    done(err)
                }
                expect(status).toBe(403)
                expect(body).toHaveProperty('message', 'Authorized user only!')
                done()
            })
        })

        test('No access token', done => {
            request(app)
            .delete(`/products/${idProduct}`)
            .set('access_token', '')
            .end((err, res) => {
                const { status, body } = res
                if(err) {
                    done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'Please login first!')
                done()
            })
        })
    })
})