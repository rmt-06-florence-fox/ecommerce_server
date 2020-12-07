const request = require('supertest');
const app = require ('../app')
const { User } = require ('../models')
const { genToken } = require ('../helpers')
let access_token = ''

beforeAll(() => {
    User.findOne({
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
        // console.log(comingUser)
        // console.log(token)
        // console.log(access_token)
        return false
    })
    return false

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
                if (err) return done(err);
                expect(status).toBe(201)
                expect(body).toHaveProperty(name, 'Sepatu');
                return done()
            })
        });
    });
});