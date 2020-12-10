const request = require('supertest')
const app = require('../app')
const{ Product, Admin } = require('../models')
const {generateToken} = require('../helper/helper_token')
const {sequelize} = require('../models')
const { queryInterface } = sequelize

let access_token_admin = ''
let id 

let data = {
    name: 'jaket',
    imageUrl: 'test',
    stock: 10,
    price: 5000
}
let data2 = {
    name: 'celana',
    imageUrl: 'abcd',
    stock: 111,
    price: 1234
}

beforeAll (async (done) => {
    try {
        const admin = Admin.findOne({
            where: {
                email: "admin@gmail.com"
            }
        })
        access_token_admin = generateToken({id: admin.id, email: admin.email})
        done()
    } catch (error) {
        done(error)
    }
})

afterAll (async (done) => {
    queryInterface.bulkDelete("Products")
    .then(response => {
        done()
    })
    .catch(err => {
        done(err)
    })
})

describe('CRUD /product', ()=> {
    describe('Create product success POST /product', () => {
        test('response with object', (done) => {
            request(app)
            .post('/product')
            .send(data)
            .set('access_token', access_token_admin)
            .end((err, res) => {
                const {body, status} = res

                if(err) return done(err)
                expect(status).toBe(201)
                expect(body).toHaveProperty("name", "clothes")
                expect(body).toHaveProperty("image_url", "clothes.jpg")
                expect(body).toHaveProperty("stock", 10)
                expect(body).toHaveProperty("price", 200.000)
                done()
            })
        })
    })
    describe('Read all product Success GET /product', () => {
        test('response with data', (done) => {
            request(app)
            .get('/product')
            .set('access_token', access_token_admin)
            .end((err, res) => {
                const {body, status} = res

                if(err) return done(err)
                expect(status).toBe(200)
                done()
            })
        })  
    })
    describe('Delete product Success Delete /product/:id', () => {
        test('response with data', (done) => {
            request(app)
            .delete('/product/' + id)
            .set('access_token', access_token_admin)
            .end((err, res) => {
                const {body, status} = res

                if(err) return done(err)
                expect(status).toBe(200)
                done()
            })
        })  
    })
    describe('Edit product Success Edit /product/:id', () => {
        test('response with data', (done) => {
            request(app)
            .delete('/product/' + id)
            .set('access_token', access_token_admin)
            .send(data2)
            .end((err, res) => {
                const {body, status} = res

                if(err) return done(err)
                expect(status).toBe(200)
                expect(body).toHaveProperty("name", "celana")
                expect(body).toHaveProperty("image_url", "abcd")
                expect(body).toHaveProperty("stock", 111)
                expect(body).toHaveProperty("price", 1234)
                done()
            })
        })  
    })
})