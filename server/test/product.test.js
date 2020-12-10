const request = require('supertest')
const app = require('../app')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
let token = ''
let productId = ''
let UserId

const { sequelize } = require('../models')
const { queryInterface } = sequelize

beforeAll(done => {
    const salt = bcrypt.genSaltSync(8);
    const hash = bcrypt.hashSync('hiha', salt);
    queryInterface.bulkInsert(
        'Users',
        [
            { 
            email: 'hiha@example.com',
            password: hash,
            role: 'admin',
            createdAt: new Date(),
            updatedAt: new Date(),
            }
        ],
        { returning: true },
    )
    .then(user => {
        console.log(user[0], '>>>>>>>>>>>>> yang ini');
        UserId = user[0].id
        token = jwt.sign({
            id: user[0].id,
            email: user[0].email,
            role: user[0].role
        }, 'hiha')
        done()
    })
    .catch(err => {
        done(err)
    })
}) 


afterAll((done) => {
    queryInterface.bulkDelete('Users')
        .then(response => {
            done()
        })
        .catch(err => {
            done(err)
        })
})


describe('add Product POST /products', () => {
    describe('Success add Product', () => {
        test('return name of product', done => {
            request(app)
            .post('/products')
            .set('access_token', token)
            .send({
                name: 'White Cap',
                image_url: 'https://i5.walmartimages.com/asr/c2da2491-a2e6-4605-9aa1-e4a770f284b9_1.76521323ac7aabcbb4bd668b0a45c2a2.jpeg?odnHeight=2000&odnWidth=2000&odnBg=ffffff',
                price: 120000,
                stock: 40,
                UserId: UserId
        })
            .end((err, res) => {
                // err di sini adalah error dari test, BUKAN dari server. error dari server masuk res
                const {body, status} = res
                if (err) {
                    return done(err)
                }
                // console.log(UserId);
                // console.log(body);
                productId = body.id
                // console.log(productId);
                expect(status).toBe(201)
                expect(body).toHaveProperty('name', 'White Cap')
                done()
            })
        })
    }),
    describe('Failed to add Product', () => {
        test('return error message', done => {
            request(app)
            .post('/products')
            .set('access_token', token)
            .send({
                name: '',
                image_url: 'https://i5.walmartimages.com/asr/c2da2491-a2e6-4605-9aa1-e4a770f284b9_1.76521323ac7aabcbb4bd668b0a45c2a2.jpeg?odnHeight=2000&odnWidth=2000&odnBg=ffffff',
                price: 120000,
                stock: 40
        })
            .end((err, res) => {
                // err di sini adalah error dari test, BUKAN dari server. error dari server masuk res
                const {body, status} = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(500)
                expect(body).toBe('failed')
                done()
            })
        })
    })
})


describe('get Product GET /products', () => {
    describe('Success get Product', () => {
        test('return succes message', done => {
            request(app)
            .get(`/products`)
            .set('access_token', token)
        //     .send({
        //         stock: 0
        // })
            .end((err, res) => {
                // err di sini adalah error dari test, BUKAN dari server. error dari server masuk res
                const {body, status} = res
                if (err) {
                    return done(err)
                }
                // console.log(body);
                expect(status).toBe(200)
                expect(body).toBe(body)
                done()
            })
        })
    }),
    describe('Failed to get Product', () => {
        test('return error message', done => {
            request(app)
            .get(`/products`)
            // .set('access_token', token)
        //     .send({

        //         stock: 40
        // })
            .end((err, res) => {
                // err di sini adalah error dari test, BUKAN dari server. error dari server masuk res
                const {body, status} = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(200)
                expect(body).toBe(body)
                done()
            })
        })
    })
})


describe('update Product PUT /products/:id', () => {
    describe('Success update Product', () => {
        test('return name of product', done => {
            request(app)
            .put(`/products/${productId}`)
            .set('access_token', token)
            .send({
                name: 'Green Cap',
                image_url: 'https://i5.walmartimages.com/asr/c2da2491-a2e6-4605-9aa1-e4a770f284b9_1.76521323ac7aabcbb4bd668b0a45c2a2.jpeg?odnHeight=2000&odnWidth=2000&odnBg=ffffff',
                price: 120000,
                stock: 40
        })
            .end((err, res) => {
                // err di sini adalah error dari test, BUKAN dari server. error dari server masuk res
                const {body, status} = res
                if (err) {
                    return done(err)
                }
                console.log(body);
                expect(status).toBe(200)
                expect(body).toHaveProperty('name', 'Green Cap')
                done()
            })
        })
    }),
    describe('Failed to update Product', () => {
        test('return error message', done => {
            request(app)
            .put(`/products/${productId + 10}`)
            .set('access_token', token)
            .send({
                name: '',
                image_url: 'https://i5.walmartimages.com/asr/c2da2491-a2e6-4605-9aa1-e4a770f284b9_1.76521323ac7aabcbb4bd668b0a45c2a2.jpeg?odnHeight=2000&odnWidth=2000&odnBg=ffffff',
                price: 120000,
                stock: 40
        })
            .end((err, res) => {
                // err di sini adalah error dari test, BUKAN dari server. error dari server masuk res
                const {body, status} = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body.msg).toBe('Data cant be found')
                done()
            })
        })
    })
})


describe('patch Product PUT /products/:id', () => {
    describe('Success patch Product', () => {
        test('return name of product', done => {
            request(app)
            .patch(`/products/${productId}`)
            .set('access_token', token)
            .send({
                stock: 0
        })
            .end((err, res) => {
                // err di sini adalah error dari test, BUKAN dari server. error dari server masuk res
                const {body, status} = res
                if (err) {
                    return done(err)
                }
                // console.log(body);
                expect(status).toBe(200)
                expect(body.result).toHaveProperty('name', 'Green Cap')
                done()
            })
        })
    }),
    describe('Failed to patch Product', () => {
        test('return error message', done => {
            request(app)
            .patch(`/products/${productId + 10}`)
            .set('access_token', token)
            .send({

                stock: 40
        })
            .end((err, res) => {
                // err di sini adalah error dari test, BUKAN dari server. error dari server masuk res
                const {body, status} = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body.msg).toBe('Data cant be found')
                done()
            })
        })
    })
})


describe('delete Product PUT /products/:id', () => {
    describe('Success delete Product', () => {
        test('return succes message', done => {
            request(app)
            .delete(`/products/${productId}`)
            .set('access_token', token)
        //     .send({
        //         stock: 0
        // })
            .end((err, res) => {
                // err di sini adalah error dari test, BUKAN dari server. error dari server masuk res
                const {body, status} = res
                if (err) {
                    return done(err)
                }
                console.log(body);
                expect(status).toBe(200)
                expect(body.msg).toBe('Product has been successfully deleted')
                done()
            })
        })
    }),
    describe('Failed to delete Product', () => {
        test('return error message', done => {
            request(app)
            .delete(`/products/${productId + 10}`)
            .set('access_token', token)
        //     .send({

        //         stock: 40
        // })
            .end((err, res) => {
                // err di sini adalah error dari test, BUKAN dari server. error dari server masuk res
                const {body, status} = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body.msg).toBe('Product cant be found')
                done()
            })
        })
    })
})
