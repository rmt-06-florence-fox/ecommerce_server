const request = require('supertest')
const app = require('../app')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
let token = ''
let productId = ''
let UserId

const { sequelize } = require('../models')
const { queryInterface } = sequelize

beforeAll(done => {
    const salt = bcrypt.genSaltSync(8);
    const hash = bcrypt.hashSync('hiha', salt);
    queryInterface.bulkInsert(
        'Users',
        [
            { 
            email: 'hiha@example.com',
            password: hash,
            role: 'admin',
            createdAt: new Date(),
            updatedAt: new Date(),
            }
        ],
        { returning: true },
    )
    .then(user => {
        // console.log(user);
        UserId = user[0].id
        token = jwt.sign({
            id: user[0].id,
            email: user[0].email,
            role: user[0].role
        }, 'hiha')
        done()
    })
    .catch(err => {
        done(err)
    })
}) 


afterAll((done) => {
    queryInterface.bulkDelete('Users')
        .then(response => {
            done()
        })
        .catch(err => {
            done(err)
        })
})


describe('login User POST /login', () => {
    describe('Success login User', () => {
        test('return name of User', done => {
            request(app)
            .post('/login')
            .send({
                email: 'hiha@example.com',
                password: 'hiha',
                role: 'admin'
        })
            .end((err, res) => {
                // err di sini adalah error dari test, BUKAN dari server. error dari server masuk res
                const {body, status} = res
                if (err) {
                    return done(err)
                }
                productId = body.id
                expect(status).toBe(200)
                expect(body).toHaveProperty('access_token')
                done()
            })
        })
    }),
    describe('Failed User login', () => {
        test('return error message', done => {
            request(app)
            .post('/login')
            .send({
                email: '',
                password: 'hiha',
                role: 'admin'
        })
            .end((err, res) => {
                // err di sini adalah error dari test, BUKAN dari server. error dari server masuk res
                const {body, status} = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(401)
                expect(body).toBe('Can not find your account')
                done()
            })
        })
    })
})
