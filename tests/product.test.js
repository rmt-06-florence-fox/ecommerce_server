const request = require('supertest');
const app = require('../app')

const { sequelize } = require('../models');
const { encrypt } = require('../helpers/bcrypt');
const { queryInterface } = sequelize

const dummyProductOne = {
    name: 'Sepatu',
    image_url: 'https://picsum.photos/200/300/?blur',
    price: 500000,
    stock: 15
}
let idProductOne = null;
const dummyUpdateOne = {
    name: 'Sepatu New Balance',
    image_url: 'https://picsum.photos/300/300/?blur',
    price: 750000,
    stock: 10
}

const dataAdmin = [{
    username: 'admin',
    email: 'admin@mail.com',
    password: encrypt('admin'),
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
}]

const dummyAdminToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJpYXQiOjE1OTUzODE3MTV9.xxFwGSOeNeZ-I89p6ItTcfzZqg_0f0h22DZRWB6S81U`

const dummyNotAdminToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoibm90LmFkbWluQG1haWwuY29tIiwiaWF0IjoxNTk1Mzk2Nzc2fQ.Lu80S8NPKhKaOMipCBiK4qN3rsue_WUI8jQOWQFb-zE`

beforeAll(async (done) => {
    await queryInterface.bulkDelete('Products')
    await queryInterface.bulkInsert('Users', dataAdmin)
    done()
})

describe('TEST PRODUCT', () => {
    describe('GET /products', () => {
        describe('Get product success test', () => {
            test('200 get all products', (done) => {
                request(app)
                    .get('/products')
                    .set('Accept', 'application/json')
                    .set('access_token', dummyAdminToken)
                    .end(function (err, res) {
                        if (err) throw err;
                        else {
                            expect(res.status).toBe(200)
                            expect(res.body).toHaveProperty('products')
                            return done()
                        }
                    })
            });

        })
    })
})

describe('POST /products', () => {
    describe('Add product success test', () => {
        test('201 Add product success', (done) => {
            const newProduct = { ...dummyProductOne }
            request(app)
                .post('/products')
                .send(newProduct)
                .set('Accept', 'application/json')
                .set('access_token', dummyAdminToken)
                .end(function (err, res) {
                    if (err) throw err;
                    else {
                        // console.log(res)
                        expect(res.status).toBe(201)
                        expect(res.body).toHaveProperty('id', expect.any(Number))
                        expect(res.body.name).toBe(newProduct.name)
                        expect(res.body.image_url).toBe(newProduct.image_url)
                        expect(res.body.price).toBe(newProduct.price)
                        expect(res.body.stock).toBe(newProduct.stock)

                        idProductOne = res.body.id
                        return done()
                    }
                })
        });
    })

    describe('Add product failed test', () => {
        test('400 missing name input', (done) => {
            const newProduct = { ...dummyProductOne, name: '' }
            request(app)
                .post('/products')
                .send(newProduct)
                .set('Accept', 'application/json')
                .set('access_token', dummyAdminToken)
                .end(function (err, res) {
                    if (err) throw err;
                    else {
                        // console.log(res)
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('msg', 'Name cannot be empty!')
                        return done()
                    }
                })
        });

    })

})

describe('PUT /products', () => {
    describe('Update product success test', () => {
        test('200 update product success', (done) => {
            const updatedProduct = { ...dummyUpdateOne }
            request(app)
                .put(`/products/${idProductOne}`)
                .send(updatedProduct)
                .set('Accept', 'application/json')
                .set('access_token', dummyAdminToken)
                .end(function (err, res) {
                    if (err) throw err;
                    else {
                        // console.log(res)
                        expect(res.status).toBe(200)
                        expect(res.body).toHaveProperty('msg', 'Product successfully updated.')
                        return done()
                    }
                })
        });
    })

    describe('Update product failed test', () => {
        test('401 Edit product with unregistered access_token', (done) => {
            const updatedProduct = { ...dummyUpdateOne }
            request(app)
                .put(`/products/${idProductOne}`)
                .send(updatedProduct)
                .set('Accept', 'application/json')
                .set('access_token', dummyNotAdminToken)
                .end(function (err, res) {
                    if (err) throw err;
                    else {
                        console.log(res)
                        expect(res.status).toBe(401)
                        expect(res.body).toHaveProperty('msg', 'Unauthorized, please login first!')
                        return done()
                    }
                })
        });
    })
})

describe('DELETE /products', () => {
    describe('Delete product success test', () => {
        test('200 delete product success', (done) => {
            request(app)
                .delete(`/products/${idProductOne}`)
                .set('Accept', 'application/json')
                .set('access_token', dummyAdminToken)
                .end(function (err, res) {
                    if (err) throw err;
                    else {
                        expect(res.status).toBe(200)
                        expect(res.body).toHaveProperty('msg', 'Product successfully deleted.')
                        return done()
                    }
                })
        });
    })

    describe('Delete product failed test', () => {
        test('404 Delete product with id as params in url that did not exist in database', (done) => {
            request(app)
                .delete(`/products/${idProductOne}`)
                .set('Accept', 'application/json')
                .set('access_token', dummyAdminToken)
                .end(function (err, res) {
                    if (err) throw err;
                    else {
                        console.log(res)
                        expect(res.status).toBe(404)
                        expect(res.body).toHaveProperty('msg', 'Product not found.')
                        return done()
                    }
                })
        });

    })
})