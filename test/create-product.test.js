const request = require('supertest')
const app = require('../app')
const {generateToken} = require('../helpers/jwt')

let access_token
beforeAll(done => {
    access_token = generateToken({id: 1, email: 'admin@mail.com'})
    done()
})

let noadmin_access_token
beforeAll(done => {
    noadmin_access_token = generateToken({id: 2, email: 'customer@mail.com'})
    done()
})

let id = 5

describe('Create Product POST /products', () => {
    describe('Add Product Success', () => {
        test('Response  added product', done => {
            request(app)
                .post('/products')
                .set('access_token', access_token)
                .send({
                    name: 'Adidas NMD R1', 
                    image_url: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/73101ab9d9ee445db281ab57011a0229_9366/NMD_R1_Shoes_Blue_FV1734_01_standard.jpg',
                    price: 2600000,
                    stock: 5
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err) {
                        return done(err)
                    }
                    expect(status).toBe(201)
                    expect(body).toHaveProperty('name', 'Adidas NMD R1')
                    expect(body).toHaveProperty('image_url', 'https://assets.adidas.com/images/w_600,f_auto,q_auto/73101ab9d9ee445db281ab57011a0229_9366/NMD_R1_Shoes_Blue_FV1734_01_standard.jpg')
                    expect(body).toHaveProperty('price', 2600000)
                    expect(body).toHaveProperty('stock', 5)
                    done()
                })
        })
    })
})

describe('Create Product POST /products', () => {
    describe('Add Product Error No Token', () => {
        test('Response Unauthorized Error Message', done => {
            request(app)
                .post('/products')
                .set('access_token', '')
                .send({
                    name: 'Adidas NMD R1', 
                    image_url: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/73101ab9d9ee445db281ab57011a0229_9366/NMD_R1_Shoes_Blue_FV1734_01_standard.jpg',
                    price: 2600000,
                    stock: 5
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
})

describe('Create Product POST /products', () => {
    describe('Add Product Error Not Admin Token', () => {
        test('Response Unauthorized Error Message', done => {
            request(app)
                .post('/products')
                .set('access_token', noadmin_access_token)
                .send({
                    name: 'Adidas NMD R1', 
                    image_url: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/73101ab9d9ee445db281ab57011a0229_9366/NMD_R1_Shoes_Blue_FV1734_01_standard.jpg',
                    price: 2600000,
                    stock: 5
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
})

describe('Create Product POST /products', () => {
    describe('Add Product Error Stock', () => {
        test('Response message Minimum stock is 0', done => {
            request(app)
                .post('/products')
                .set('access_token', access_token)
                .send({
                    name: 'Adidas NMD R1', 
                    image_url: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/73101ab9d9ee445db281ab57011a0229_9366/NMD_R1_Shoes_Blue_FV1734_01_standard.jpg',
                    price: 2600000,
                    stock: -1
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err) {
                        return done(err)
                    }
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'Minimum stock is 0')
                    done()
                })
        })
    })
})

describe('Create Product POST /products', () => {
    describe('Add Product Error Stock', () => {
        test('Response message Minimum price is 0', done => {
            request(app)
                .post('/products')
                .set('access_token', access_token)
                .send({
                    name: 'Adidas NMD R1', 
                    image_url: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/73101ab9d9ee445db281ab57011a0229_9366/NMD_R1_Shoes_Blue_FV1734_01_standard.jpg',
                    price: -2000,
                    stock: 5
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err) {
                        return done(err)
                    }
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'Minimum price is 0')
                    done()
                })
        })
    })
})

describe('Create Product POST /products', () => {
    describe('Add Product Required Value', () => {
        test('Response message Name is Required', done => {
            request(app)
                .post('/products')
                .set('access_token', access_token)
                .send({
                    name: '', 
                    image_url: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/73101ab9d9ee445db281ab57011a0229_9366/NMD_R1_Shoes_Blue_FV1734_01_standard.jpg',
                    price: 2600000,
                    stock: 5
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err) {
                        return done(err)
                    }
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'Name is required')
                    done()
                })
        })
    })
})

describe('Create Product POST /products', () => {
    describe('Add Product Stock Invalid Datatype', () => {
        test('Response message Only number allowed', done => {
            request(app)
                .post('/products')
                .set('access_token', access_token)
                .send({
                    name: 'Adidas NMD R1', 
                    image_url: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/73101ab9d9ee445db281ab57011a0229_9366/NMD_R1_Shoes_Blue_FV1734_01_standard.jpg',
                    price: 2600000,
                    stock: 'hmm'
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err) {
                        return done(err)
                    }
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'Only Number is Allowed')
                    done()
                })
        })
    })
})

describe('Update Product PUT /products/:id', () => {
    describe('Update Product Success', () => {
        test('Response update product', done => {
            request(app)
                .put('/products/' + id)
                .set('access_token', access_token)
                .send({
                    name: 'Adidas NMD R2', 
                    image_url: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/73101ab9d9ee445db281ab57011a0229_9366/NMD_R1_Shoes_Blue_FV1734_01_standard.jpg',
                    price: 3600000,
                    stock: 3
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err) {
                        return done(err)
                    }
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('name', 'Adidas NMD R2')
                    expect(body).toHaveProperty('image_url', 'https://assets.adidas.com/images/w_600,f_auto,q_auto/73101ab9d9ee445db281ab57011a0229_9366/NMD_R1_Shoes_Blue_FV1734_01_standard.jpg')
                    expect(body).toHaveProperty('price', 3600000)
                    expect(body).toHaveProperty('stock', 3)
                    done()
                })
        })
    })
})

describe('Update Product PUT /products/:id', () => {
    describe('Update Product Error No Token', () => {
        test('Response Unauthorized Error Message', done => {
            request(app)
                .put('/products/' + id)
                .set('access_token', '')
                .send({
                    name: 'Adidas NMD R2', 
                    image_url: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/73101ab9d9ee445db281ab57011a0229_9366/NMD_R1_Shoes_Blue_FV1734_01_standard.jpg',
                    price: 3600000,
                    stock: 3
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
})

describe('Update Product PUT /products/:id', () => {
    describe('Update Product Error Not Admin Token', () => {
        test('Response Unauthorized Error Message', done => {
            request(app)
                .put('/products/' + id)
                .set('access_token', noadmin_access_token)
                .send({
                    name: 'Adidas NMD R2', 
                    image_url: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/73101ab9d9ee445db281ab57011a0229_9366/NMD_R1_Shoes_Blue_FV1734_01_standard.jpg',
                    price: 3600000,
                    stock: 3
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
})

describe('Update Product POST /products', () => {
    describe('Update Product Error Stock', () => {
        test('Update message Minimum stock is 0', done => {
            request(app)
                .put('/products/' + id)
                .set('access_token', access_token)
                .send({
                    name: 'Adidas NMD R2', 
                    image_url: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/73101ab9d9ee445db281ab57011a0229_9366/NMD_R1_Shoes_Blue_FV1734_01_standard.jpg',
                    price: 3600000,
                    stock: -2
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err) {
                        return done(err)
                    }
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'Minimum stock is 0')
                    done()
                })
        })
    })
})

describe('Update Product POST /products', () => {
    describe('Update Product Error Stock', () => {
        test('Response message Minimum price is 0', done => {
            request(app)
                .put('/products/' + id)
                .set('access_token', access_token)
                .send({
                    name: 'Adidas NMD R1', 
                    image_url: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/73101ab9d9ee445db281ab57011a0229_9366/NMD_R1_Shoes_Blue_FV1734_01_standard.jpg',
                    price: -1000,
                    stock: 5
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err) {
                        return done(err)
                    }
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'Minimum price is 0')
                    done()
                })
        })
    })
})

describe('Update Product POST /products', () => {
    describe('Update Product Required Value', () => {
        test('Response message Name is Required', done => {
            request(app)
                .put('/products/' + id)
                .set('access_token', access_token)
                .send({
                    name: '', 
                    image_url: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/73101ab9d9ee445db281ab57011a0229_9366/NMD_R1_Shoes_Blue_FV1734_01_standard.jpg',
                    price: 3600000,
                    stock: 3
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err) {
                        return done(err)
                    }
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'Name is required')
                    done()
                })
        })
    })
})

describe('Update Product POST /products', () => {
    describe('Update Product Stock Invalid Datatype', () => {
        test('Response message Only number allowed', done => {
            request(app)
                .put('/products/' + id)
                .set('access_token', access_token)
                .send({
                    name: 'Adidas NMD R2', 
                    image_url: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/73101ab9d9ee445db281ab57011a0229_9366/NMD_R1_Shoes_Blue_FV1734_01_standard.jpg',
                    price: 3600000,
                    stock: 'hmm'
                })
                .end((err, res) => {
                    const { body, status } = res
                    if(err) {
                        return done(err)
                    }
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'Only Number is Allowed')
                    done()
                })
        })
    })
})

describe('Delete Product DELETE /products/:id', () => {
    describe('Delete Product Success', () => {
        test('Response delete successfuly', done => {
            request(app)
                .delete('/products/' + id)
                .set('access_token', access_token)
                .end((err, res) => {
                    const { body, status } = res
                    if(err) {
                        return done(err)
                    }
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('message', 'Product deleted successfuly')
                    done()
                })
        })
    })
})

describe('Delete Product DELETE /products/:id', () => {
    describe('Delete Product Error No Token', () => {
        test('Response Unauthorized Error Message', done => {
            request(app)
                .delete('/products/' + id)
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

describe('Delete Product DELETE /products/:id', () => {
    describe('Delete Product Error Not Admin Token', () => {
        test('Response Unauthorized Error Message', done => {
            request(app)
                .delete('/products/' + id)
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