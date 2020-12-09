const request = require('supertest')
const app = require('../app')
const { generateToken } = require('../helpers/jwt.js')

let access_token = ''
let invalid_access_token = ''
beforeAll((done) => {
  access_token = generateToken(2, 'admin@mail.com', 'admin')
  invalid_access_token = generateToken(3, `random@mail.com`, 'admin')
  done()
})

describe('create product POST /products', () => {
    describe('create success', () => {
        test('response with result ', done => {
            request(app)
            .post('/products')
            .set('access_token', access_token)
            .send({
                name: 'Les Paul',
                image_url: 'https://www.musik-produktiv.com/pic-010109188xl/gibson-les-paul-standard-heritage-cherry-sunburst-10109188.jpg',
                price: 32500000,
                stock: 8,
                category: 'standard'
            })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(201)
                expect(body).toHaveProperty('name', 'Les Paul')
                expect(body).toHaveProperty('image_url', 'https://www.musik-produktiv.com/pic-010109188xl/gibson-les-paul-standard-heritage-cherry-sunburst-10109188.jpg')
                expect(body).toHaveProperty('price', 32500000)
                expect(body).toHaveProperty('stock', 8)
                expect(body).toHaveProperty('category', 'standard')
                done()
            })    
        })
    })
    describe('create error without access_token', () => {
        test('response with error', done => {
            request(app)
            .post('/products')
            .send({
                name: 'Les Paul',
                image_url: 'https://www.musik-produktiv.com/pic-010109188xl/gibson-les-paul-standard-heritage-cherry-sunburst-10109188.jpg',
                price: 32500000,
                stock: 8,
                category: 'standard'
            })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "please login");
                done()
            })    
        })
    })
    describe('create error with invalid email', () => {
        test('response with error', done => {
            request(app)
            .post('/products')
            .set('access_token', invalid_access_token)
            .send({
                name: 'Les Paul',
                image_url: 'https://www.musik-produktiv.com/pic-010109188xl/gibson-les-paul-standard-heritage-cherry-sunburst-10109188.jpg',
                price: 32500000,
                stock: 8,
                category: 'standard'
            })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "user not exist");
                done()
            })    
        })
    })
    describe('create error with empty fields', () => {
        test('response with error', done => {
            request(app)
            .post('/products')
            .set('access_token', access_token)
            .send({
                name: '',
                image_url: '',
                price: '',
                stock: '',
                category: ''
            })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(400);
                expect(body).toHaveProperty("message", [
                    'name empty',
                    'image_url empty',
                    'price empty',
                    'stock empty',
                    'category empty'
                ]);
                done()
            })    
        })
    })
})