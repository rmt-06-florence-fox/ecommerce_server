const request = require('supertest')
const app = require('../app')
const { generateToken } = require('../helpers/jwt.js')

let access_token = ''
let invalid_access_token = ''
let id = 14
beforeAll((done) => {
  access_token = generateToken(2, 'admin@mail.com', 'admin')
  invalid_access_token = generateToken(3, `random@mail.com`, 'admin')
  done()
})

describe('update product PUT /products/:id', () => {
    describe('update success', () => {
        test('response with result ', done => {
            request(app)
            .put('/products/' + id)
            .set('access_token', access_token)
            .send({
                name: 'Stratocaster',
                image_url: 'https://static.keymusic.com/products/248690/XL/fender-american-professional-stratocaster-rw-3-color-sunburst.jpg',
                price: 29000000,
                stock: 12,
                category: 'ultra'
            })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(200)
                expect(body).toHaveProperty('name', 'Stratocaster')
                expect(body).toHaveProperty('image_url', 'https://static.keymusic.com/products/248690/XL/fender-american-professional-stratocaster-rw-3-color-sunburst.jpg')
                expect(body).toHaveProperty('price', 29000000)
                expect(body).toHaveProperty('stock', 12)
                expect(body).toHaveProperty('category', 'ultra')
                done()
            })    
        })
    })
    describe('update error without access_token', () => {
        test('response with error', done => {
            request(app)
            .put('/products/' + id)
            .send({
                name: 'Stratocaster',
                image_url: 'https://static.keymusic.com/products/248690/XL/fender-american-professional-stratocaster-rw-3-color-sunburst.jpg',
                price: 29000000,
                stock: 12,
                category: 'ultra'
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
    describe('update error with invalid email', () => {
        test('response with error', done => {
            request(app)
            .put('/products/' + id)
            .set('access_token', invalid_access_token)
            .send({
                name: 'Stratocaster',
                image_url: 'https://static.keymusic.com/products/248690/XL/fender-american-professional-stratocaster-rw-3-color-sunburst.jpg',
                price: 29000000,
                stock: 12,
                category: 'ultra'
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
    describe('update error with empty fields', () => {
        test('response with error', done => {
            request(app)
            .put('/products/' + id)
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
    // describe('update error with invalid product id', () => {
    //     test('response with error', done => {
    //         request(app)
    //         .put('/products/' + id)
    //         .set('access_token', access_token)
    //         .send({
    //             name: 'Stratocaster',
    //             image_url: 'https://static.keymusic.com/products/248690/XL/fender-american-professional-stratocaster-rw-3-color-sunburst.jpg',
    //             price: 29000000,
    //             stock: 12,
    //             category: 'ultra'
    //         })
    //         .end((err, res) => {
    //             const { body, status } = res
    //             if (err) {
    //                 return done(err)
    //             }
    //             expect(status).toBe(404);
    //             expect(body).toHaveProperty("message", "product not found");
    //             done()
    //         })    
    //     })
    // })
})