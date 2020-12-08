const request = require('supertest');
const app = require ('../app')
const { User } = require ('../models')
const { genToken } = require ('../helpers')
let access_token = ''
let token_access = ''
const { sequelize } = require ('../models')
const { queryInterface } = sequelize
let id;

beforeAll(() => {

        return User.findOne({
            where: {
                email: 'admin@ecom.com'
            }
        })
        .then( comingUser => {
            
            const token = genToken({
                id: comingUser.id,
                username: comingUser.username,
                email: comingUser.email,
                role: comingUser.role
            })
            access_token = token
                return queryInterface.bulkInsert('Users' ,[{
                    username: 'dummy',
                    email: `dummy@dum.dum`,
                    password: '123456',
                    address: 'dummy address',
                    createdAt: new Date (),
                    updatedAt: new Date ()
                }], {
                    returning: true
                })
                .then (res => {
                    const token = genToken({
                        id: res[0].id,
                        username: res[0].username,
                        email: res[0].email,
                        role: res[0].role
                    })
                    token_access = token
                    return queryInterface.bulkDelete('Users', null, {})
                })
        })


});

describe('Testing Route Product', () => {
    describe('Product add POST /product', () => {
        test('return new product on success', (done) => {
            request(app)
            .post('/product')
            .set('access_token', access_token)
            .send({ name: 'Sepatu', 
                    image_url:'/image.img', 
                    price: 100000,
                    stock: 2})
            .end((err, res) => {
                const { status, body } = res
                id = body.id
                if (err) return done(err);
                expect(status).toBe(201)
                expect(body).toHaveProperty("name", 'Sepatu');
                return done()
            })
        });

        test('return need to login without token', (done) => {
            request(app)
            .post('/product')
            // .set('access_token', access_token)
            .send({ name: 'Sepatu', 
                    image_url:'/image.img', 
                    price: 100000,
                    stock: 2})
            .end((err, res) => {
                const { status, body } = res
                if (err) return done(err);
                expect(status).toBe(400)
                expect(body).toHaveProperty("error", 'Need login to access');
                return done()
            })
        });

        test('return Access admin only on incorrect token', (done) => {
            request(app)
            .post('/product')
            .set('access_token', token_access)
            .send({ name: 'Sepatu', 
                    image_url:'/image.img', 
                    price: 100000,
                    stock: 2})
            .end((err, res) => {
                const { status, body } = res
                if (err) return done(err);
                expect(status).toBe(400)
                expect(body).toHaveProperty("error", 'Access admin only');
                return done()
            })
        });

        test('return error when required field not filled', (done) => {
            request(app)
            .post('/product')
            .set('access_token', access_token)
            .send({ name: '', 
                    image_url:'/image.img', 
                    price: 100000,
                    stock: 2})
            .end((err, res) => {
                const { status, body } = res
                if (err) return done(err);
                expect(status).toBe(500)
                expect(body).toHaveProperty("errors",expect.arrayContaining(["Product Name can't be empty"]) );
                return done()
            })
        });

        test('return error when required field not filled', (done) => {
            request(app)
            .post('/product')
            .set('access_token', access_token)
            .send({ name: 'Sepatu', 
                    image_url:'/image.img', 
                    price: -100000,
                    stock: 2})
            .end((err, res) => {
                const { status, body } = res
                if (err) return done(err);
                expect(status).toBe(500)
                expect(body).toHaveProperty("errors",expect.arrayContaining(["Price can't be lower than Rp 99"]) );
                return done()
            })
        });

        test('return error when required field not filled', (done) => {
            request(app)
            .post('/product')
            .set('access_token', access_token)
            .send({ name: 'Sepatu', 
                    image_url:'/image.img', 
                    price: 100000,
                    stock: -2})
            .end((err, res) => {
                const { status, body } = res
                if (err) return done(err);
                expect(status).toBe(500)
                expect(body).toHaveProperty("errors",expect.arrayContaining(["Stock can't be lower than 0"]) );
                return done()
            })
        });

        test('return error when required field not filled', (done) => {
            request(app)
            .post('/product')
            .set('access_token', access_token)
            .send({ name: 'Sepatu', 
                    image_url:'/image.img', 
                    price: 100000,
                    stock: 'a'})
            .end((err, res) => {
                const { status, body } = res
                if (err) return done(err);
                expect(status).toBe(500)
                expect(body).toHaveProperty("errors",expect.arrayContaining(["Stock only accept numbers"]) );
                return done()
            })
        });

    });

    describe('Product edit PUT /product/:id', () => {
        test('return updated data on success', (done) => {
            request(app)
            .put(`/product/${id}`)
            .set('access_token', access_token)
            .send({ name: 'Sepatu Edit', 
                    image_url:'/image.img', 
                    price: 100000,
                    stock: 2})
            .end((err, res) => {
                const { status, body } = res
                if (err) return done(err);
                expect(status).toBe(200)
                expect(body).toHaveProperty("updatedProduct")
                return done()
            })
        });

        test('return updated data on success', (done) => {
            request(app)
            .put(`/product/${id}`)
            .set('access_token', token_access)
            .send({ name: 'Sepatu Edit', 
                    image_url:'/image.img', 
                    price: 100000,
                    stock: 2})
            .end((err, res) => {
                const { status, body } = res
                if (err) return done(err);
                expect(status).toBe(400)
                expect(body).toHaveProperty("error", 'Access admin only');
                return done()
            })
        });

        test('return error when required field not filled', (done) => {
            request(app)
            .put(`/product/${id}`)
            .set('access_token', access_token)
            .send({ name: '', 
                    image_url:'/image.img', 
                    price: 100000,
                    stock: 2})
            .end((err, res) => {
                const { status, body } = res
                if (err) return done(err);
                expect(status).toBe(500)
                expect(body).toHaveProperty("errors",expect.arrayContaining(["Product Name can't be empty"]) );
                return done()
            })
        });

        test('return error when required field not filled', (done) => {
            request(app)
            .put(`/product/${id}`)
            .set('access_token', access_token)
            .send({ name: 'Sepatu', 
                    image_url:'/image.img', 
                    price: -100000,
                    stock: 2})
            .end((err, res) => {
                const { status, body } = res
                if (err) return done(err);
                expect(status).toBe(500)
                expect(body).toHaveProperty("errors",expect.arrayContaining(["Price can't be lower than Rp 99"]) );
                return done()
            })
        });

        test('return error when required field not filled', (done) => {
            request(app)
            .put(`/product/${id}`)
            .set('access_token', access_token)
            .send({ name: 'Sepatu', 
                    image_url:'/image.img', 
                    price: 100000,
                    stock: -2})
            .end((err, res) => {
                const { status, body } = res
                if (err) return done(err);
                expect(status).toBe(500)
                expect(body).toHaveProperty("errors",expect.arrayContaining(["Stock can't be lower than 0"]) );
                return done()
            })
        });

        test('return error when required field not filled', (done) => {
            request(app)
            .put(`/product/${id}`)
            .set('access_token', access_token)
            .send({ name: 'Sepatu', 
                    image_url:'/image.img', 
                    price: 100000,
                    stock: 'a'})
            .end((err, res) => {
                const { status, body } = res
                if (err) return done(err);
                expect(status).toBe(500)
                expect(body).toHaveProperty("errors",expect.arrayContaining(["Stock only accept numbers"]) );
                return done()
            })
        });

    });

    describe('Product get all GET /product', () => {
        test('return all products on success', (done) => {
            request(app)
            .get('/product')
            .set('access_token', access_token)
            .end((err, res) => {
                const { status, body } = res
                if (err) return done(err);
                expect(status).toBe(200)
                expect(body).toHaveProperty("products");
                return done()
            })
        });

        test('return need to login without token', (done) => {
            request(app)
            .get('/product')
            // .set('access_token', access_token)
            .end((err, res) => {
                const { status, body } = res
                if (err) return done(err);
                expect(status).toBe(400)
                expect(body).toHaveProperty("error", 'Need login to access');
                return done()
            })
        });

        test('return Access admin only on incorrect token', (done) => {
            request(app)
            .get('/product')
            .set('access_token', token_access)
            .end((err, res) => {
                const { status, body } = res
                if (err) return done(err);
                expect(status).toBe(400)
                expect(body).toHaveProperty("error", 'Access admin only');
                return done()
            })
        });

    });


    describe('Product delete DELETE /product/:id', () => {
        test('return error when required field not filled', (done) => {
            request(app)
            .delete(`/product/${id}`)
            // .set('access_token', access_token)
            .end((err, res) => {
                const { status, body } = res
                if (err) return done(err);
                expect(status).toBe(400)
                expect(body).toHaveProperty("error", 'Need login to access');
                return done()
            })
        });

        test('return error when required field not filled', (done) => {
            request(app)
            .delete(`/product/${id}`)
            .set('access_token', token_access)
            .end((err, res) => {
                const { status, body } = res
                if (err) return done(err);
                expect(status).toBe(400)
                expect(body).toHaveProperty("error", 'Access admin only');
                return done()
            })
        });

        test('return error when required field not filled', (done) => {
            request(app)
            .delete(`/product/${id}`)
            .set('access_token', access_token)
            .end((err, res) => {
                const { status, body } = res
                if (err) return done(err);
                expect(status).toBe(200)
                expect(body).toHaveProperty("message", `item deleted`);
                return done()
            })
        });

    });
});