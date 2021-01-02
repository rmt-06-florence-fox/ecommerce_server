const request = require('supertest')
const app = require('../app')
const { User } = require('../models')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { generateToken } = require('../helpers/jwt')
const { hashPassword } = require('../helpers/hash')

let access_token = ''
let customer_token = ''
let id

beforeAll((done) => {
    let admin = {
        email: 'admin@gmail.com',
        password: hashPassword('qwerty'),
        role: 'admin'
    }
    let customer = {
        email: 'okky@mail.com',
        password: hashPassword('qwerty'),
        role: 'customer'
    }

    User.create(admin)
        .then(data => {
            access_token = generateToken({
                id: data.id,
                email: data.email
            })
            return User.create(customer)
        })
        .then(data => {
            customer_token = generateToken({
                id: data.id,
                email: data.email
            })
            done()
        })
        .catch(err => {
            done(err)
        })
    
})

afterAll((done) => {
    queryInterface.bulkDelete('Products')
        .then(() => {
            return queryInterface.bulkDelete('Users')
        })
        .then(() => {
            done()
        })
        .catch((err) => {
            done(err)
        })
})

describe("Create Product Post /products", () => {
    test("success create product", done => {
        request(app)
            .post('/products')
            .set('access_token', access_token)
            .send({
                name: 'Iphone 12 Pro Max',
                image_url: 'https://ecs7.tokopedia.net/img/cache/700/VqbcmM/2020/10/14/1de220d1-49e0-4277-bc31-e3440c529f11.jpg',
                price: 42000000,
                stock: 100
            })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(201)
                expect(body).toHaveProperty('id', expect.any(Number))
                expect(body).toHaveProperty('name', 'Iphone 12 Pro Max')
                expect(body).toHaveProperty('image_url', 'https://ecs7.tokopedia.net/img/cache/700/VqbcmM/2020/10/14/1de220d1-49e0-4277-bc31-e3440c529f11.jpg')
                expect(body).toHaveProperty('price', 42000000)
                expect(body).toHaveProperty('stock', 100)
                id = +body.id
                done()
            })
    })

    test("failed create with no access token", done => {
        request(app)
            .post('/products')
            .send({
                name: 'Iphone 12 Pro Max',
                image_url: 'https://ecs7.tokopedia.net/img/cache/700/VqbcmM/2020/10/14/1de220d1-49e0-4277-bc31-e3440c529f11.jpg',
                price: 42000000,
                stock: 100
            })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'Please Login First')
                done()
            })
    })

    test("failed create with wrong access token", done => {
        request(app)
            .post('/products')
            .set('access_token', customer_token)
            .send({
                name: 'Iphone 12 Pro Max',
                image_url: 'https://ecs7.tokopedia.net/img/cache/700/VqbcmM/2020/10/14/1de220d1-49e0-4277-bc31-e3440c529f11.jpg',
                price: 42000000,
                stock: 100
            })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'Unauthorized access')
                done()
            })
    })

    test("failed create with empty name", done => {
        request(app)
            .post('/products')
            .set('access_token', access_token)
            .send({
                name: '',
                image_url: 'https://ecs7.tokopedia.net/img/cache/700/VqbcmM/2020/10/14/1de220d1-49e0-4277-bc31-e3440c529f11.jpg',
                price: 42000000,
                stock: 100
            })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty('error', ['Name is mandatory!'])
                done()
            })
    })

    test("failed create with empty image_url", done => {
        request(app)
            .post('/products')
            .set('access_token', access_token)
            .send({
                name: 'Iphone 12 Pro Max',
                image_url: '',
                price: 42000000,
                stock: 100
            })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty('error', ['Image url is mandatory!'])
                done()
            })
    })

    test("failed create with format price not a number", done => {
        request(app)
            .post('/products')
            .set('access_token', access_token)
            .send({
                name: 'Iphone 12 Pro Max',
                image_url: 'https://ecs7.tokopedia.net/img/cache/700/VqbcmM/2020/10/14/1de220d1-49e0-4277-bc31-e3440c529f11.jpg',
                price: 'empat puluh juta',
                stock: 100
            })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty('error', ['Price must be a number format'])
                done()
            })
    })

    test("failed create with minus price input", done => {
        request(app)
            .post('/products')
            .set('access_token', access_token)
            .send({
                name: 'Iphone 12 Pro Max',
                image_url: 'https://ecs7.tokopedia.net/img/cache/700/VqbcmM/2020/10/14/1de220d1-49e0-4277-bc31-e3440c529f11.jpg',
                price: -42000000,
                stock: 100
            })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty('error', ['Price must be greater than 0'])
                done()
            })
    })

    test("failed create with empty price", done => {
        request(app)
            .post('/products')
            .set('access_token', access_token)
            .send({
                name: 'Iphone 12 Pro Max',
                image_url: 'https://ecs7.tokopedia.net/img/cache/700/VqbcmM/2020/10/14/1de220d1-49e0-4277-bc31-e3440c529f11.jpg',
                price: null,
                stock: 100
            })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty('error', ['Price is mandatory!'])
                done()
            })
    })

    test("failed create with format stock not a number", done => {
        request(app)
            .post('/products')
            .set('access_token', access_token)
            .send({
                name: 'Iphone 12 Pro Max',
                image_url: 'https://ecs7.tokopedia.net/img/cache/700/VqbcmM/2020/10/14/1de220d1-49e0-4277-bc31-e3440c529f11.jpg',
                price: 42000000,
                stock: 'seratus'
            })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty('error', ['Stock must be a number format'])
                done()
            })
    })

    test("failed create with minus stock input", done => {
        request(app)
            .post('/products')
            .set('access_token', access_token)
            .send({
                name: 'Iphone 12 Pro Max',
                image_url: 'https://ecs7.tokopedia.net/img/cache/700/VqbcmM/2020/10/14/1de220d1-49e0-4277-bc31-e3440c529f11.jpg',
                price: 42000000,
                stock: -100
            })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty('error', ['Stock must be greater than 0'])
                done()
            })
    })

    test("failed create with empty stock", done => {
        request(app)
            .post('/products')
            .set('access_token', access_token)
            .send({
                name: 'Iphone 12 Pro Max',
                image_url: 'https://ecs7.tokopedia.net/img/cache/700/VqbcmM/2020/10/14/1de220d1-49e0-4277-bc31-e3440c529f11.jpg',
                price: 42000000,
                stock: null
            })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty('error', ['Stock is mandatory!'])
                done()
            })
    })
})

describe("Show Product Get /products", () => {
    test("success show all products", done => {
        request(app)
            .get('/products')
            .set('access_token', access_token)
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(200)
                expect(body.length).toBeGreaterThan(0)
                done()
            })

    })

    test("failed show all products with no access token", done => {
        request(app)
            .get('/products')
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'Please Login First')
                done()
            })

    })
})

describe("Update Product Put /products/:id", () => {
    test("success update product", done => {
        request(app)
            .put(`/products/${id}`)
            .set('access_token', access_token)
            .send({
                name: 'Samsung Galaxy note 20 ultra', 
                image_url: 'https://i.ytimg.com/vi/DWRcNpR6Kdc/maxresdefault.jpg',
                price: 18000000,
                stock: 80
            })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(200)
                expect(body).toHaveProperty('id', id)
                expect(body).toHaveProperty('name', 'Samsung Galaxy note 20 ultra')
                expect(body).toHaveProperty('image_url', 'https://i.ytimg.com/vi/DWRcNpR6Kdc/maxresdefault.jpg')
                expect(body).toHaveProperty('price', 18000000)
                expect(body).toHaveProperty('stock', 80)
                done()
            })
    })

    test("failed update with no access token", done => {
        request(app)
            .put(`/products/${id}`)
            .send({
                name: 'Samsung Galaxy note 20 ultra', 
                image_url: 'https://i.ytimg.com/vi/DWRcNpR6Kdc/maxresdefault.jpg',
                price: 18000000,
                stock: 80
            })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'Please Login First')
                done()
            })
    })

    test("failed update with wrong access token", done => {
        request(app)
            .put(`/products/${id}`)
            .set('access_token', customer_token)
            .send({
                name: 'Samsung Galaxy note 20 ultra', 
                image_url: 'https://i.ytimg.com/vi/DWRcNpR6Kdc/maxresdefault.jpg',
                price: 18000000,
                stock: 80
            })
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'Unauthorized access')
                done()
            })
    })
})

describe("Delete Product delete /products/:id", () => {
    test("success delete product", done => {
        request(app)
            .delete(`/products/${id}`)
            .set('access_token', access_token)
            .end((err, res) => {
                const { body, status } = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(200)
                expect(body).toHaveProperty('message', `Product success to delete`)
                done()
            })
    })
})