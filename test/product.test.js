const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { generateToken } = require('../helpers/jwt')

let access_token = ''

beforeAll((done) => {
    let user = {
        id: '2',
        email: 'admin@gmail.com',        
    }
    access_token = generateToken(user)
    return queryInterface.bulkInsert("Products", [
        {
            name: 'Play Station 5',
            image_url: 'https://o.aolcdn.com/images/dims?thumbnail=640%2C&quality=95&image_uri=https%3A%2F%2Fs.yimg.com%2Fos%2Fcreatr-uploaded-images%2F2020-11%2F0ce35760-2109-11eb-afff-7c47c293c781&client=amp-blogside-v2&signature=1e151c60b1085b52681e32f5b20ec5fe6c6c919a',
            price: 8800000,
            stock: 50,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ], { returning: true })
    .then(data => {
        productId = data.id
        done()
    })
    .catch(err => {
        done(err)
    })
})

afterAll((done) => {
    queryInterface.bulkDelete('Products')
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
        .set('access_token', 'wrong_token')
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
})