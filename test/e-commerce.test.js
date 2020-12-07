const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const queryInterface = sequelize.getQueryInterface();
const { hashPassword } = require('../helpers/bcrypt');
const { generateJwt , decodeJwt} = require('../helpers/jwt')

let adminId = 1
let adminEmail = 'admin@mail.com'

let customerId = 2
let customerEmail = 'customer@mail.com'

let jwtAdmin = generateJwt({id:adminId,email:adminEmail})
let jwtCustomer = generateJwt({id:customerId,email:customerEmail})

let productId;

let product1 = {
    name:'box',
    image_url: 'https://www.celladorales.com/wp-content/uploads/2016/12/ShippingBox_sq.jpg',
    price: 5000,
    stock: 2,
    category: 'box'
}
let product2 = {
    name:'',
    image_url: 'https://www.celladorales.com/wp-content/uploads/2016/12/ShippingBox_sq.jpg',
    price: 5000,
    stock: 2,
    category: 'box'
}
let product3 = {
    name:'box',
    image_url: 'https://www.celladorales.com/wp-content/uploads/2016/12/ShippingBox_sq.jpg',
    price: -1000,
    stock: 2,
    category: 'box'
}
let product4 = {
    name:'box',
    image_url: 'https://www.celladorales.com/wp-content/uploads/2016/12/ShippingBox_sq.jpg',
    price: 5000,
    stock: -2,
    category: 'box'
}
let product5 = {
    name:'box',
    image_url: 'https://www.celladorales.com/wp-content/uploads/2016/12/ShippingBox_sq.jpg',
    price: 5000,
    stock: 2,
    category: ''
}
let product6 = {
    name:'box',
    image_url: 'https://www.celladorales.com/wp-content/uploads/2016/12/ShippingBox_sq.jpg',
    price: 'lima ribu rupiah',
    stock: 2,
    category: ''
}
let product7 = {
    name:'boxes',
    image_url: 'https://www.celladorales.com/wp-content/uploads/2016/12/ShippingBox_sq.jpg',
    price: 20000,
    stock: 4,
    category: 'shirt'
}

beforeAll( (done)=>{
    done()
})

afterAll((done)=>{
    queryInterface.bulkDelete('Products',null,{})
    done()
})

describe('routes for all',()=>{
    test('login admin',done=>{
        request(app)
        .post('/login')
        .send({email: 'admin@mail.com',password:'123456'})
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err,res)=>{
            if(err) return done(err)
            expect(res.body).toHaveProperty('access_token',expect.any(String))
            done()
        })
    })
    test('login admin salah password',done=>{
        request(app)
        .post('/login')
        .send({email: 'admin@mail.com', password: '654321'})
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err,res)=>{
            if(err) return done(err)
            expect(res.body).toHaveProperty('message','Invalid email/password')
            done()
        })
    })
    test('login admin tidak ada email dan password',done=>{
        request(app)
        .post('/login')
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err,res)=>{
            if(err) return done(err)
            expect(res.body).toHaveProperty('message','User not found')
            done()
        })
    })
    test('create product without headers',done=>{
        request(app)
        .post('/products')
        .send(product1)
        .expect('Content-Type', /json/)
        .expect(401)
        .end((err,res)=>{
            if(err) return done(err)
            expect(res.body).toHaveProperty('message','please login first')
            done()
        })
    })
    test('create product tapi access_token customer',done=>{
        request(app)
        .post('/products')
        .set('access_token',jwtCustomer)
        .send(product1)
        .expect('Content-Type', /json/)
        .expect(403)
        .end((err,res)=>{
            if(err) return done(err)
            expect(res.body).toHaveProperty('message','Unauthorized access')
            done()
        })
    })
    test('create product bawa token admin tapi name kosong',done=>{
        request(app)
        .post('/products')
        .set('access_token',jwtAdmin)
        .send(product2)
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err,res)=>{
            if(err) return done(err)
            expect(res.body).toHaveProperty('message','name is required')
            done()
        })
    })
    test('create product bawa token admin tapi price negatif',done=>{
        request(app)
        .post('/products')
        .set('access_token',jwtAdmin)
        .send(product3)
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err,res)=>{
            if(err) return done(err)
            expect(res.body).toHaveProperty('message','please insert price correctly')
            done()
        })
    })
    test('create product bawa token admin tapi price diisi pake string',done=>{
        request(app)
        .post('/products')
        .set('access_token',jwtAdmin)
        .send(product6)
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err,res)=>{
            if(err) return done(err)
            expect(res.body).toHaveProperty('message','please insert price correctly')
            done()
        })
    })
    test('create product bawa token admin tapi stock negatif',done=>{
        request(app)
        .post('/products')
        .set('access_token',jwtAdmin)
        .send(product4)
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err,res)=>{
            if(err) return done(err)
            expect(res.body).toHaveProperty('message','please insert stock correctly')
            done()
        })
    })
    test('create product bawa token admin tapi category kosong',done=>{
        request(app)
        .post('/products')
        .set('access_token',jwtAdmin)
        .send(product5)
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err,res)=>{
            if(err) return done(err)
            expect(res.body).toHaveProperty('message','please choose category')
            done()
        })
    })
    test('create product bawa access_token admin',done=>{
        request(app)
        .post('/products')
        .send(product1)
        .set('access_token',jwtAdmin)
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err,res)=>{
            if(err) return done(err)
            expect(res.body).toHaveProperty('products',expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                image_url: expect.any(String),
                price: expect.any(Number),
                stock: expect.any(Number),
                category: expect.any(String)
            }))
            productId = res.body.id
            done()
        })
    })
    test('update product tidak bawa access_token',done=>{
        request(app)
        .put(`/products${productId}`)
        .send(product7)
        .expect('Content-Type', /json/)
        .expect(401)
        .end((err,res)=>{
            if(err) return done(err)
            expect(res.body).toHaveProperty('message','please login first')
            done()
        })
    })
    test('update product bawa access_token bukan admin',done=>{
        request(app)
        .put(`/products${productId}`)
        .set('access_token',jwtCustomer)
        .send(product7)
        .expect('Content-Type', /json/)
        .expect(403)
        .end((err,res)=>{
            if(err) return done(err)
            expect(res.body).toHaveProperty('message','Unauthorized access')
            done()
        })
    })
    test('update product bawa token admin tapi stock negatif',done=>{
        request(app)
        .put(`/products${productId}`)
        .set('access_token',jwtAdmin)
        .send(product4)
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err,res)=>{
            if(err) return done(err)
            expect(res.body).toHaveProperty('message','please insert stock correctly')
            done()
        })
    })
    test('create product bawa token admin tapi price negatif',done=>{
        request(app)
        .put(`/products${productId}`)
        .set('access_token',jwtAdmin)
        .send(product3)
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err,res)=>{
            if(err) return done(err)
            expect(res.body).toHaveProperty('message','please insert price correctly')
            done()
        })
    })
    test('create product bawa token admin tapi price diisi pake string',done=>{
        request(app)
        .put(`/products${productId}`)
        .set('access_token',jwtAdmin)
        .send(product6)
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err,res)=>{
            if(err) return done(err)
            expect(res.body).toHaveProperty('message','please insert price correctly')
            done()
        })
    })
    
    test('delete product tidak bawa access_token',done=>{
        request(app)
        .delete(`/products${productId}`)
        .expect('Content-Type', /json/)
        .expect(401)
        .end((err,res)=>{
            if(err) return done(err)
            expect(res.body).toHaveProperty('message','please login first')
            done()
        })
    })
    test('delete product bawa access_token bukan admin',done=>{
        request(app)
        .delete(`/products${productId}`)
        .set('access_token',jwtCustomer)
        .expect('Content-Type', /json/)
        .expect(403)
        .end((err,res)=>{
            if(err) return done(err)
            expect(res.body).toHaveProperty('message','Unauthorized access')
            done()
        })
    })
})
