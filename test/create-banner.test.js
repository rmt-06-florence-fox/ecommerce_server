const request = require('supertest')
const app = require('../app')
const {generateToken} = require('../helpers/jwt')

let access_token
let noadmin_access_token

beforeAll(done => {
    access_token = generateToken({id: 1, email: 'admin@mail.com'})
    noadmin_access_token = generateToken({id: 2, email: 'customer@mail.com'})
    done()
})

let idBanner

describe('Create Banner POST /banners', () => {
    describe('Add Banner Success', () => {
        test('Response  added banner', done => {
            request(app)
                .post('/banners')
                .set('access_token', access_token)
                .send({
                    title: 'Tokoku',
                    status: 'active',
                    image_url: 'https://d26bwjyd9l0e3m.cloudfront.net/wp-content/uploads/2019/10/ecommerce.jpg'
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err) {
                        return done(err)
                    }
                    idBanner = res.body.id
                    expect(status).toBe(201)
                    expect(body).toHaveProperty('title', 'Tokoku')
                    expect(body).toHaveProperty('status', 'active')
                    expect(body).toHaveProperty('image_url', 'https://d26bwjyd9l0e3m.cloudfront.net/wp-content/uploads/2019/10/ecommerce.jpg')
                    done()
                })
        })
    })

    describe('Add Banner Error No Token', () => {
        test('Response Unauthorized Error Message', done => {
            request(app)
                .post('/banners')
                .set('access_token', '')
                .send({
                    title: 'Tokoku',
                    status: 'active',
                    image_url: 'https://d26bwjyd9l0e3m.cloudfront.net/wp-content/uploads/2019/10/ecommerce.jpg'
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err) {
                        return done(err)
                    }
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('message', 'Please Login First')
                    done()
                })
        })
    })

    describe('Add Banner Error Not Admin Token', () => {
        test('Response Unauthorized Error Message', done => {
            request(app)
                .post('/banners')
                .set('access_token', noadmin_access_token)
                .send({
                    title: 'Tokoku',
                    status: 'active',
                    image_url: 'https://d26bwjyd9l0e3m.cloudfront.net/wp-content/uploads/2019/10/ecommerce.jpg'
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err) {
                        return done(err)
                    }
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('message', 'You are not authorized')
                    done()
                })
        })
    })

    describe('Add Banner Required Value', () => {
        test('Response message Title is Required', done => {
            request(app)
                .post('/banners')
                .set('access_token', access_token)
                .send({
                    title: '',
                    status: 'active',
                    image_url: 'https://d26bwjyd9l0e3m.cloudfront.net/wp-content/uploads/2019/10/ecommerce.jpg'
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err) {
                        return done(err)
                    }
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'Title is required')
                    done()
                })
        })
    })
})


describe('Find All Banner GET /banners', () => {
    describe('Get Banner Success', () => {
        test('Response get banner', done => {
            request(app)
                .get('/banners')
                .set('access_token', access_token)
                .end((err, res) => {
                    const { body, status } = res
                    if(err) {
                        return done(err)
                    }
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('banners')
                    done()
                })
        })
    })
    
    describe('Get Banner Error No Token', () => {
        test('Response Unauthorized Error Message', done => {
            request(app)
                .get('/banners')
                .set('access_token', '')
                .end((err, res) => {
                    const { body, status } = res
                    if(err) {
                        return done(err)
                    }
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('message', 'Please Login First')
                    done()
                })
        })
    })
})

describe('Find By Id Banner GET /banners/:id', () => {
    describe('Get Banner Success', () => {
        test('Response get banner', done => {
            request(app)
                .get('/banners/' + idBanner)
                .set('access_token', access_token)
                .end((err, res) => {
                    const { body, status } = res
                    if(err) {
                        return done(err)
                    }
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('banner')
                    done()
                })
        })
    })
    
    describe('Get Banner Error No Token', () => {
        test('Response Unauthorized Error Message', done => {
            request(app)
                .get('/banners/' + idBanner)
                .set('access_token', '')
                .end((err, res) => {
                    const { body, status } = res
                    if(err) {
                        return done(err)
                    }
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('message', 'Please Login First')
                    done()
                })
        })
    })
})

describe('Update Banner PUT /banners/:id', () => {
    describe('Update Banner Success', () => {
        test('Response update banner', done => {
            request(app)
                .put('/banners/' + idBanner)
                .set('access_token', access_token)
                .send({
                    title: 'TokoX',
                    status: 'active',
                    image_url: 'https://d26bwjyd9l0e3m.cloudfront.net/wp-content/uploads/2019/10/ecommerce.jpg'
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err) {
                        return done(err)
                    }
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('title', 'TokoX')
                    expect(body).toHaveProperty('status', 'active')
                    expect(body).toHaveProperty('image_url', 'https://d26bwjyd9l0e3m.cloudfront.net/wp-content/uploads/2019/10/ecommerce.jpg')
                    done()
                })
        })
    })

    describe('Update Banner Error No Token', () => {
        test('Response Unauthorized Error Message', done => {
            request(app)
                .put('/banners/' + idBanner)
                .set('access_token', '')
                .send({
                    title: 'TokoX',
                    status: 'active',
                    image_url: 'https://d26bwjyd9l0e3m.cloudfront.net/wp-content/uploads/2019/10/ecommerce.jpg'
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err) {
                        return done(err)
                    }
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('message', 'Please Login First')
                    done()
                })
        })
    })

    describe('Update Banner Error Not Admin Token', () => {
        test('Response Unauthorized Error Message', done => {
            request(app)
                .put('/banners/' + idBanner)
                .set('access_token', noadmin_access_token)
                .send({
                    title: 'TokoX',
                    status: 'active',
                    image_url: 'https://d26bwjyd9l0e3m.cloudfront.net/wp-content/uploads/2019/10/ecommerce.jpg'
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err) {
                        return done(err)
                    }
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('message', 'You are not authorized')
                    done()
                })
        })
    })
    
    describe('Update Banner Required Value', () => {
        test('Response message Title is Required', done => {
            request(app)
                .put('/banners/' + idBanner)
                .set('access_token', access_token)
                .send({
                    title: '',
                    status: 'active',
                    image_url: 'https://d26bwjyd9l0e3m.cloudfront.net/wp-content/uploads/2019/10/ecommerce.jpg'
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err) {
                        return done(err)
                    }
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'Title is required')
                    done()
                })
        })
    })
})

describe('Delete Banner DELETE /banners/:id', () => {
    describe('Delete Banner Success', () => {
        test('Response delete successfuly', done => {
            request(app)
                .delete('/banners/' + idBanner)
                .set('access_token', access_token)
                .end((err, res) => {
                    const { body, status } = res
                    if(err) {
                        return done(err)
                    }
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('message', 'Banner deleted successfuly')
                    done()
                })
        })
    })

    describe('Delete Banner Error No Token', () => {
        test('Response Unauthorized Error Message', done => {
            request(app)
                .delete('/banners/' + idBanner)
                .set('access_token', '')
                .end((err, res) => {
                    const { body, status } = res
                    if(err) {
                        return done(err)
                    }
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('message', 'Please Login First')
                    done()
                })
        })
    })

    describe('Delete Banner Error Not Admin Token', () => {
        test('Response Unauthorized Error Message', done => {
            request(app)
                .delete('/banners/' + idBanner)
                .set('access_token', noadmin_access_token)
                .end((err, res) => {
                    const { body, status } = res
                    if(err) {
                        return done(err)
                    }
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('message', 'You are not authorized')
                    done()
                })
        })
    })
})