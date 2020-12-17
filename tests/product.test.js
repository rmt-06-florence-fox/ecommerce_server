const request = require('supertest')
const app = require('../app.js')
const {sequelize} = require('../models')
const {queryInterface} = sequelize
const { createToken } = require('../helpers/jwt.js')
const {Product} = require('../models')

let headers = {}
let newDataProduct = {}


afterAll((done) =>{
    queryInterface.bulkDelete("Products")
    .then(res=>{
        done()
    })
    .catch(err=>{
        done(err)
    })
})

beforeAll((done) =>{
    let dataProduct = {
        name: 'Sepatu Air Jordan 1',
        image_url: 'https://sneakernews.com/wp-content/uploads/2020/06/jordan-1-wmns-satin-snakeskin-CD0461-601-4.jpg',
        price: 5000000,
        stock: 6,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    Product.create(dataProduct)
    .then( res=>{
        newDataProduct.id = res.dataValues.id
        newDataProduct.name = res.dataValues.name
        newDataProduct.image_url = res.dataValues.image_url
        newDataProduct.price = res.dataValues.price
        newDataProduct.stock = res.dataValues.stock
        console.log(newDataProduct.id, 'id new <<<<<<<<<<<<<<<<<,')
        
        let admin = {
            email: 'admin@email.com',
            role: 'admin'
        }
        let customer = {
            email: 'customer@email.com',
            role: 'customer'
        }
        headers.admin_access_token = createToken(admin)
        headers.customer_access_token = createToken(customer)
        done()
    })
    .catch( err =>{
        console.log(err)
        done(err)
    })

})

describe('Test EndPoint Product', ()=>{
    //success create product
    test('Success Create Product', (done)=>{
        request(app)
        .post('/product')
        .set('access_token', headers.admin_access_token)
        .send({
            name: 'Sepatu Air Jordan 1',
            image_url: 'https://sneakernews.com/wp-content/uploads/2020/06/jordan-1-wmns-satin-snakeskin-CD0461-601-4.jpg',
            price: 5000000,
            stock: 6,
        })
        .end((err, res) => {
            const {body, status} = res
            if(err) {
                return done(err)
            }
            expect(status).toEqual(201)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('Sepatu Air Jordan 1')
            expect(body).toHaveProperty('image_url', 'https://sneakernews.com/wp-content/uploads/2020/06/jordan-1-wmns-satin-snakeskin-CD0461-601-4.jpg')
            expect(body).toHaveProperty('price', 5000000)
            expect(body).toHaveProperty('stock', 6)
            done()
        })
    })

    //failed create product (empty access_token)
    test('failed create product (empty access_token)', (done)=>{
        request(app)
        .post('/product')
        .set('access_token', '')
        .send({
            name: 'Sepatu Air Jordan 1',
            image_url: 'https://sneakernews.com/wp-content/uploads/2020/06/jordan-1-wmns-satin-snakeskin-CD0461-601-4.jpg',
            price: 5000000,
            stock: 6,
        })
        .end((err, res) => {
            const {body, status} = res
            if(err) {
                return done(err)
            }
            expect(status).toEqual(401)
            expect(body).toHaveProperty('message', 'invalid Token')
            done()
        })
    })

    //failed create product (wrong access_token)
    test('failed create product (wrong access_token)', (done)=>{
        request(app)
        .post('/product')
        .set('access_token', headers.customer_access_token)
        .send({
            name: 'Sepatu Air Jordan 1',
            image_url: 'https://sneakernews.com/wp-content/uploads/2020/06/jordan-1-wmns-satin-snakeskin-CD0461-601-4.jpg',
            price: 5000000,
            stock: 6,
        })
        .end((err, res) => {
            const {body, status} = res
            if(err) {
                return done(err)
            }
            expect(status).toEqual(401)
            expect(body).toHaveProperty('message', 'invalid Token')
            done()
        })
    })

    //failed create product (empty name)
    test('failed create product (empty name)', (done)=>{
        request(app)
        .post('/product')
        .set('access_token', dataTest.admin_access_token)
        .send({
            name: '',
            image_url: 'https://sneakernews.com/wp-content/uploads/2020/06/jordan-1-wmns-satin-snakeskin-CD0461-601-4.jpg',
            price: 5000000,
            stock: 6,
        })
        .end((err, res) => {
            const {body, status} = res
            if(err) {
                return done(err)
            }
            expect(status).toEqual(401)
            expect(body).toHaveProperty('message', 'the product name cannot be blank')
            done()
        })
    })

    // failed create product (minus stock)
    test('failed create product (minus stock)', (done)=>{
        request(app)
        .post('/product')
        .set('access_token', headers.admin_access_token)
        .send({
            name: 'Sepatu Air Jordan 1',
            image_url: 'https://sneakernews.com/wp-content/uploads/2020/06/jordan-1-wmns-satin-snakeskin-CD0461-601-4.jpg',
            price: 5000000,
            stock: -6,
        })
        .end((err, res) => {
            const {body, status} = res
            if(err) {
                return done(err)
            }
            expect(status).toEqual(401)
            expect(body).toHaveProperty('message', 'product stock must not be below 0')
            done()
        })
    })

    //failed create product (minus price)
    test('failed create product (minus price)', (done)=>{
        request(app)
        .post('/product')
        .set('access_token', headers.admin_access_token)
        .send({
            name: 'Sepatu Air Jordan 1',
            image_url: 'https://sneakernews.com/wp-content/uploads/2020/06/jordan-1-wmns-satin-snakeskin-CD0461-601-4.jpg',
            price: -5000000,
            stock: 6,
        })
        .end((err, res) => {
            const {body, status} = res
            if(err) {
                return done(err)
            }
            expect(status).toEqual(401)
            expect(body).toHaveProperty('message', 'product price must not be below 0')
            done()
        })
    })

    // failed create product (wrong type data)
    test('failed create product (wrong type data)', (done)=>{
        request(app)
        .post('/product')
        .set('access_token', headers.admin_access_token)
        .send({
            name: 'Sepatu Air Jordan 1',
            image_url: 'https://sneakernews.com/wp-content/uploads/2020/06/jordan-1-wmns-satin-snakeskin-CD0461-601-4.jpg',
            price: '5000000',
            stock: 6,
        })
        .end((err, res) => {
            const {body, status} = res
            if(err) {
                return done(err)
            }
            expect(status).toEqual(401)
            expect(body).toHaveProperty('message', 'product prices must not be integer')
            done()
        })
    })

    // ======== Update product ========
    //success update product
    test('Success update Product', (done)=>{
        request(app)
        .put(`/product/${newDataProduct.id}`)
        .set('access_token', headers.admin_access_token)
        .send({
            name: 'Sepatu Air Jordan 11',
            image_url: 'https://images.complex.com/complex/images/c_crop,h_1092,w_1941,x_32,y_574/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/gxtabuctifqxylvhauhl/air-jordan-11-xi-retro-bred-2019-378037-061-pair',
            price: 6000000,
            stock: 5,
        })
        .end((err, res) => {
            const {body, status} = res
            if(err) {
                return done(err)
            }
            expect(status).toEqual(200)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('name', 'Sepatu Air Jordan 11')
            expect(body).toHaveProperty('image_url', 'https://images.complex.com/complex/images/c_crop,h_1092,w_1941,x_32,y_574/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/gxtabuctifqxylvhauhl/air-jordan-11-xi-retro-bred-2019-378037-061-pair')
            expect(body).toHaveProperty('price', 6000000)
            expect(body).toHaveProperty('stock', 5)
            done()
        })
    })

    //failed update product (wrong access_token)
    test('failed update product (wrong access_token)', (done)=>{
        request(app)
        .put(`/product/${newDataProduct.id}`)
        .set('access_token', headers.customer_access_token)
        .send({
            name: 'Sepatu Air Jordan 11',
            image_url: 'https://images.complex.com/complex/images/c_crop,h_1092,w_1941,x_32,y_574/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/gxtabuctifqxylvhauhl/air-jordan-11-xi-retro-bred-2019-378037-061-pair',
            price: 6000000,
            stock: 5,
        })
        .end((err, res) => {
            const {body, status} = res
            if(err) {
                return done(err)
            }
            expect(status).toEqual(401)
            expect(body).toHaveProperty('message', 'you are not admin')
            done()
        })
    })

    //failed create product (minus stock)
    test('failed create product (minus stock)', (done)=>{
        request(app)
        .put(`/product/${newDataProduct.id}`)
        .set('access_token', headers.admin_access_token)
        .send({
            name: 'Sepatu Air Jordan 11',
            image_url: 'https://images.complex.com/complex/images/c_crop,h_1092,w_1941,x_32,y_574/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/gxtabuctifqxylvhauhl/air-jordan-11-xi-retro-bred-2019-378037-061-pair',
            price: 6000000,
            stock: -5,
        })
        .end((err, res) => {
            const {body, status} = res
            if(err) {
                return done(err)
            }
            expect(status).toEqual(401)
            expect(body).toHaveProperty('message', 'product stock must not be below 0')
            done()
        })
    })

    //failed create product (wrong data type)
    test('failed create product (wrong data type)', (done)=>{
        request(app)
        .put(`/product/${newDataProduct.id}`)
        .set('access_token', headers.admin_access_token)
        .send({
            name: 'Sepatu Air Jordan 11',
            image_url: 'https://images.complex.com/complex/images/c_crop,h_1092,w_1941,x_32,y_574/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/gxtabuctifqxylvhauhl/air-jordan-11-xi-retro-bred-2019-378037-061-pair',
            price: 6000000,
            stock: '5',
        })
        .end((err, res) => {
            const {body, status} = res
            if(err) {
                return done(err)
            }
            console.log(body)
            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'product prices must not be integer')
            done()
        })
    })

    //failed create product (minus price)
    test('failed create product (minus price)', (done)=>{
        request(app)
        .put(`/product/${newDataProduct.id}`)
        .set('access_token', headers.admin_access_token)
        .send({
            name: 'Sepatu Air Jordan 11',
            image_url: 'https://images.complex.com/complex/images/c_crop,h_1092,w_1941,x_32,y_574/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/gxtabuctifqxylvhauhl/air-jordan-11-xi-retro-bred-2019-378037-061-pair',
            price: -6000000,
            stock: 5,
        })
        .end((err, res) => {
            const {body, status} = res
            if(err) {
                return done(err)
            }
            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'product prices must not be below 0')
            done()
        })
     })

    // ====== Delete Product =====
    // success delete product
    test('success delete product', (done)=>{
        request(app)
        .delete(`/product/${newDataProduct.id}`)
        .set('access_token', headers.admin_access_token)
        .end((err, res) => {
            const {body, status} = res
            if(err) {
                return done(err)
            }
            expect(status).toEqual(200)
            expect(body).toHaveProperty('msg', 'Product has Deleted')
            done()
        })
    })

    //failed delete product (wrong access_token)
    test('failed delete product (wrong access_token)', (done)=>{
        request(app)
        .delete(`/product/${newDataProduct.id}`)
        .set('access_token', headers.customer_access_token)
        .end((err, res) => {
            const {body, status} = res
            if(err) {
                return done(err)
            }
            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'you are not admin')
            done()
        })
    })
})