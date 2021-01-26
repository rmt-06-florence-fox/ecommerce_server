const request = require('supertest')
const app = require('../app')
const{ Admin } = require('../models')
const {generatePassword} = require('../helper/helper_password')
const {generateToken} = require('../helper/helper_token')

let data = {
    email: "admin1@mail.com",
    password: generatePassword('admin'),
    role: "admin"
}
let access_token = ''

beforeAll(async (done) => {
    try {
        const admin = await Admin.create(data) 
        if (admin) {
            access_token = generateToken({id: admin.id, email: admin.email})
        }
        done()
    } catch (error) {
        done(error)
    }
})

afterAll(async (done) => {
    try {
        await Admin.destroy({
            where: {
                email: data.email
            }
        })
        done()
    } catch (error) {
        done(error)
    }
})

describe('Login user POST /login', () => {
    describe('Success Login', () => {
        test('response with access token', (done) => {
            request(app)
            .post('/login')
            .send({email: "admin1@gmail.com", password: "admin"})
            .end((err, res) => {
                const {body, status} = res
                
                if(err) return done(err)
                expect(status).toBe(200)
                expect(body).toHaveProperty("email", "admin1@gmail.com")
                expect(body).toHaveProperty("access_token", expect.any(String))
                done()
            })
        })
    })
    describe('fail Login with wrong password', () => {
        test('response with invalid email or password', (done) => {
            request(app)
            .post('/login')
            .send({email: "admin1@gmail.com", password: "casvsdad"})
            .end((err, res) => {
                const {body, status} = res
                
                if(err) return done(err)
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "Invalid email or Password!")
                done()
            })
        })
    })
    describe('fail Login with empty input', () => {
        test('response with invalid account', (done) => {
            request(app)
            .post('/login')
            .send({email: "", password: ""})
            .end((err, res) => {
                const {body, status} = res
                
                if(err) return done(err)
                expect(status).toBe(404)
                expect(body).toHaveProperty("message", "Invalid account")
                done()
            })
        })
    })
})