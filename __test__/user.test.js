const app = require('../app.js')
const request = require('supertest')
const {User} = require('../models')

afterAll(() => {
    User.destroy({where :  {fullName : "testing"}})
},5000)

describe('testing User routes when success', () => {
    test('userName should be unique', (done) => {
        request(app)
        .post('/register')
        .set('Accept', 'application/json')
        .send({
            fullName : "testing",
            userName : "hndrbs",
            email : "testing@gmail.com",
            password : "rahasia"
        })
        .end((err, res) => {
            const {body, status} = res

            if(err) return done(err)
            expect(status).toBe(201)
            expect(body).toHavePropery("email", "testing@gmail.com")
            done()
        })
    })
})
