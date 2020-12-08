const app = require('../app.js')
const request = require('supertest')
const Helper = require('../helpers')
const { sequelize } = require('../models')
const queryInterface = sequelize.getQueryInterface()

afterAll(async (done) => {
    try {
        await queryInterface.bulkDelete('Users', null, {})
        done()
    } catch (err) {
        //console.log(err)
        done(err)
    }
})

beforeAll(async (done) => {
    const data = require('../seedingData/users.json')
    data.forEach(d => {
        d.createdAt = new Date()
        d.updatedAt = new Date()
        d.password = Helper.hash(d.password)
    })

    try {
        await queryInterface.bulkInsert("Users", data, {}, {})
        done()
        
    } catch (err) {
        done(err)
    }
})

describe('testing user register when success', () => {
    test('user name  & email should be unique & password should be at least six chars', (done) => {
        request(app)
            .post('/register')
            .set('Accept', 'application/json')
            .send({
                fullName : "testing",
                userName : "kale",
                email : "testing0@gmail.com",
                password : "testing123"
            })
            .end((err, res) => {
                if(err) return done(err)

                const {body, status} = res
                expect(status).toBe(201)
                expect(body).toHaveProperty("email", "testing0@gmail.com")
                done()
            })
    })
})

describe('testing user register when error', () => {
    test('error response when user name is not unique', (done) => {
        request(app)
            .post('/register')
            .set('Accept', 'application/json')
            .send({
                fullName: "testing",
                userName: "kale",
                email: "testing1@gmail.com",
                password: "testing123"
            })
            .end((err, res) => {
                if (err) return done(err)

                const { body, status } = res
                expect(status).toBe(400)
                expect(body).toHaveProperty("messages", [
                    "Oops, someone else has been using this user name"
                ])
                done()
            })
    })
    
    test('error response when email is not unique', (done) => {
        request(app)
            .post('/register')
            .set('Accept', 'application/json')
            .send({
                fullName: "testing",
                userName: "kale2",
                email: "testing0@gmail.com",
                password: "testing123"
            })
            .end((err, res) => {
                if (err) return done(err)

                const { body, status } = res
                expect(status).toBe(400)
                expect(body).toHaveProperty("messages", [
                    "Looks like this email has already been used by another user"
                ])
                done()
            })
    })

    test('error response when password is less then 6 chars', (done) => {
        request(app)
            .post('/register')
            .set('Accept', 'application/json')
            .send({
                fullName: "testing",
                userName: "kale3",
                email: "testing3@gmail.com",
                password: "test"
            })
            .end((err, res) => {
                if (err) return done(err)

                const { body, status } = res
                expect(status).toBe(400)
                expect(body).toHaveProperty("messages", [
                    "Your password should be at least 6 characters"
                ])
                done()
            })
    })

    test('error response when email is empty', (done) => {
        request(app)
            .post('/register')
            .set('Accept', 'application/json')
            .send({
                fullName: "testing",
                userName: "kale4",
                email: "",
                password: "test12093"
            })
            .end((err, res) => {
                if (err) return done(err)

                const { body, status } = res
                expect(status).toBe(400)
                expect(body).toHaveProperty("messages", [
                    "Email cannot be empty",
                    "Please check your email, was its format correct ?"
                ])
                done()
            })
    })

    test("error response when email format is not correct" , (done) => {
        request(app)
            .post('/register')
            .set('Accept', 'application/json')
            .send({
                fullName: "testing",
                userName: "kale5",
                email: "sakjbfsiuebf",
                password: "test12312"
            })
            .end((err, res) => {
                if (err) return done(err)

                const { body, status } = res
                expect(status).toBe(400)
                expect(body).toHaveProperty("messages", [
                    "Please check your email, was its format correct ?"
                ])
                done()
            })
    })
})

describe('testing user login', () => {
    test('response if login successfully should be an object with access_token in it', (done) => {
        request(app)
            .post('/login')
            .set('Accept', 'application/json')
            .send({ 
                email: "hndrbs153@gmail.com", 
                password: "rahasia" })
            .end((err, res) => {
                if(err) return done(err)

                const {status, body} = res
                expect(status).toBe(200)
                expect(body).toHaveProperty("access_token")
                done()
            })
    })

    test('response login if submitted PASSWORD is wrong, the message should tell user that password and/or email is not found', (done) => {
        request(app)
            .post('/login')
            .set('Accept', 'application/json')
            .send({
                email: "hndrbs153@gmail.com",
                password: "rahaaaaaia"
            })
            .end((err, res) => {
                if (err) return done(err)

                const { status, body } = res
                expect(status).toBe(404)
                expect(body).toHaveProperty("messages", [
                    "Cannot find a matched password and email"
                ])
                done()
            })
    })

    test('response login if submitted EMAIL is wrong, the message should tell user that password and/or email is not found', (done) => {
        request(app)
            .post('/login')
            .set('Accept', 'application/json')
            .send({
                email: "h53@gmail.com",
                password: "rahasia"
            })
            .end((err, res) => {
                if (err) return done(err)

                const { status, body } = res
                expect(status).toBe(404)
                expect(body).toHaveProperty("messages", [
                    "Cannot find a matched password and email"
                ])
                done()
            })
    })
})