const request = require('supertest')
const app = require('../app')
const {sequelize} = require('../models/index')
const {queryInterface} = sequelize

afterAll(done => {
    queryInterface.bulkDelete('Products')
    .then(res => {
        console.log(res)
        done()
    })
    .catch(err => {
        console.log(err)
        done(err)
    })
})

let id = ''
let access_token = ''
beforeAll(done => {
    request(app)
    .post('/login')
    .send({email: 'admin@mail.com', password: '123456'})
    .then(res => {
        access_token = res.body.access_token
        done()
    })
    .catch(err => {
        // console.log(err)
        done(err)
    })
})

let productData = {
    name: 'PS 5',
    image_url: 'https://wallpapercave.com/wp/wp6967907.png',
    price: 8000000,
    stock: 12,
    category: 'Electronic'
}

// Create
describe('Test EndPoint POST /products', () => {

    // test case 1, add product success
    it('test add product success', (done) => {
        request(app)
        .post('/products')
        .send(productData)
        .set('access_token', access_token)
        .then(res => {
            const {body, status} = res
            id = res.body.id
            expect(status).toBe(201)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('name', 'PS 5')
            expect(body).toHaveProperty('image_url', 'https://wallpapercave.com/wp/wp6967907.png')
            expect(body).toHaveProperty('price', 8000000)
            expect(body).toHaveProperty('stock', 12)
            expect(body).toHaveProperty('category', 'Electronic')
            done()
        })
        .catch(err => {
            // console.log(err)
            done(err)
        })
    })

    // test case 2, not access_token
    it('test add product not access_token', (done) => {
        request(app)
        .post('/products')
        .send(productData)
        .then(res => {
            const {body, status} = res
            expect(status).toBe(401)
            expect(body).toHaveProperty('msg', 'Authentication Failed!')
            done()
        })
        .catch(err => {
            // console.log(err)
            done(err)
        })
    })

    // test case 3, access_token not admin
    it('test add product access_token not admin', (done) => {
        request(app)
        .post('/products')
        .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJjdXN0b21lckBtYWlsLmNvbSIsImlhdCI6MTYwNTAyNDEwNX0.kRkRHobkaOU_VJwSSPDls8lLzCUVT3Bqr88QprKGwbQ')
        .send(productData)
        .then(res => {
            const {body, status} = res
            expect(status).toBe(403)
            expect(body).toHaveProperty('msg', 'Not Authorized!')
            done()
        })
        .catch(err => {
            // console.log(err)
            done(err)
        })
    })
    
    // test case 4, empty required
    it('test add product empty required', (done) => {
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
        .then(res => {
            const {body, status} = res
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', "Name is required! Image url is required! Price is number only! Stock is number only! Category is required!")
            done()
        })
        .catch(err => {
            // console.log(err)
            done(err)
        })
    })

    // test case 5, stock negative
    it('test add product stock minus', (done) => {
        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({
            name: 'Baju',
            image_url: 'https://www.youtube.com/watch?v=btIQvYcLNoI&list=RDZ4C4y_g3gVE&index=22',
            price: 80000,
            stock: -10,
            category: 'Pakaian'
        })
        .then(res => {
            const {body, status} = res
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', 'Cannot insert minus stock!')
            done()
        })
        .catch(err => {
            // console.log(err)
            done(err)
        })
    })

    // test case 6, price negative
    it('test add product price minus', (done) => {
        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({
            name: 'Baju',
            image_url: 'https://www.youtube.com/watch?v=btIQvYcLNoI&list=RDZ4C4y_g3gVE&index=22',
            price: -80000,
            stock: 10,
            category: 'Pakaian'
        })
        .then(res => {
            const {body, status} = res
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', 'Cannot insert minus price!')
            done()
        })
        .catch(err => {
            // console.log(err)
            done(err)
        })
    })

    // test case 7, wrong data type
    it('test add product wrong data type', (done) => {
        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({
            name: 'Baju',
            image_url: 'https://www.youtube.com/watch?v=btIQvYcLNoI&list=RDZ4C4y_g3gVE&index=22',
            price: 80000,
            stock: 'kepo',
            category: 'Pakaian'
        })
        .then(res => {
            const {body, status} = res
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', 'Stock is number only!')
            done()
        })
        .catch(err => {
            // console.log(err)
            done(err)
        })
    })
})

let UpdateData = {
    name: 'PS 2',
    image_url: 'https://wallpapercave.com/wp/wp6967907.png',
    price: 8000,
    stock: 2,
    category: 'Electronic'
}

//Update
describe('Test EndPoint POST /products/:id', () => {
    // test case 1, updated product success
    it('test update product success', (done) => {
        request(app)
        .put(`/products/${id}`)
        .set('access_token', access_token)
        .send(UpdateData)
        .then(res => {
            const {body, status} = res
            expect(status).toBe(200)
            expect(body).toHaveProperty('name', 'PS 2')
            expect(body).toHaveProperty('image_url', 'https://wallpapercave.com/wp/wp6967907.png')
            expect(body).toHaveProperty('price', 8000)
            expect(body).toHaveProperty('stock', 2)
            expect(body).toHaveProperty('category', 'Electronic')
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    // test case 2, not access_token
    it('test update product not access_token', (done) => {
        request(app)
        .put(`/products/${id}`)
        .send(UpdateData)
        .then(res => {
            const {body, status} = res
            expect(status).toBe(401)
            expect(body).toHaveProperty('msg', 'Authentication Failed!')
            done()
        })
        .catch(err => {
            // console.log(err)
            done(err)
        })
    })

    // test case 3, access_token not admin
    it('test update product access_token not admin', (done) => {
        request(app)
        .put(`/products/${id}`)
        .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJjdXN0b21lckBtYWlsLmNvbSIsImlhdCI6MTYwNTAyNDEwNX0.kRkRHobkaOU_VJwSSPDls8lLzCUVT3Bqr88QprKGwbQ')
        .send(UpdateData)
        .then(res => {
            const {body, status} = res
            expect(status).toBe(403)
            expect(body).toHaveProperty('msg', 'Not Authorized!')
            done()
        })
        .catch(err => {
            // console.log(err)
            done(err)
        })
    })

    // test case 4, stock negative
    it('test update product stock minus', (done) => {
        request(app)
        .put(`/products/${id}`)
        .set('access_token', access_token)
        .send({
            name: 'Baju',
            image_url: 'https://www.youtube.com/watch?v=btIQvYcLNoI&list=RDZ4C4y_g3gVE&index=22',
            price: 80000,
            stock: -100,
            category: 'Pakaian'
        })
        .then(res => {
            const {body, status} = res
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', 'Cannot insert minus stock!')
            done()
        })
        .catch(err => {
            // console.log(err)
            done(err)
        })
    })

    // test case 5, price negative
    it('test update product price minus', (done) => {
        request(app)
        .put(`/products/${id}`)
        .set('access_token', access_token)
        .send({
            name: 'Baju',
            image_url: 'https://www.youtube.com/watch?v=btIQvYcLNoI&list=RDZ4C4y_g3gVE&index=22',
            price: -80000,
            stock: 10,
            category: 'Pakaian'
        })
        .then(res => {
            const {body, status} = res
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', 'Cannot insert minus price!')
            done()
        })
        .catch(err => {
            // console.log(err)
            done(err)
        })
    })

    // test case 6, wrong data type
    it('test update product wrong data type', (done) => {
        request(app)
        .put(`/products/${id}`)
        .set('access_token', access_token)
        .send({
            name: 'Baju',
            image_url: 'https://www.youtube.com/watch?v=btIQvYcLNoI&list=RDZ4C4y_g3gVE&index=22',
            price: 80000,
            stock: 'kepo',
            category: 'Pakaian'
        })
        .then(res => {
            const {body, status} = res
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', 'Stock is number only!')
            done()
        })
        .catch(err => {
            // console.log(err)
            done(err)
        })
    })
})

// Delete
describe('Test EndPoint DELETE /products/:id', () => {
    // test case 1, delete product success
    it('test delete product success', (done) => {
        request(app)
        .delete(`/products/${id}`)
        .set('access_token', access_token)
        .then(res => {
            const {body, status} = res
            expect(status).toBe(200)
            expect(body).toHaveProperty('msg', 'Product Deleted Successfully')
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    // test case 2, not access_token
    it('test delete product not access_token', (done) => {
        request(app)
        .delete(`/products/${id}`)
        .then(res => {
            const {body, status} = res
            expect(status).toBe(401)
            expect(body).toHaveProperty('msg', 'Authentication Failed!')
            done()
        })
        .catch(err => {
            // console.log(err)
            done(err)
        })
    })

    // test case 3, access_token not admin
    it('test delete product access_token not admin', (done) => {
        request(app)
        .delete(`/products/${id}`)
        .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJjdXN0b21lckBtYWlsLmNvbSIsImlhdCI6MTYwNTAyNDEwNX0.kRkRHobkaOU_VJwSSPDls8lLzCUVT3Bqr88QprKGwbQ')
        .then(res => {
            const {body, status} = res
            expect(status).toBe(403)
            expect(body).toHaveProperty('msg', 'Not Authorized!')
            done()
        })
        .catch(err => {
            // console.log(err)
            done(err)
        })
    })
})