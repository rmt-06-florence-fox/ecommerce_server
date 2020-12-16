const request = require('supertest')
const app = require('../app');


const rightData = {
    email : 'admin@mail.com',
    password : 12345
}

const wrongEmail = {
    email : 'wrongAdmin@mail.com',
    password : 12345
}

const wrongPassword = {
    email : 'admin@mail.com',
    password : 111111
}

const emptyEmail = {
    email : "",
    password : 12345
}

const emptyPassword = {
    email : 'admin@mail.com',
    password : ""
}

const emptyField = {
    email : "",
    password : ""
}

describe('Success Login', () =>{
    
    test('Success login', (done) =>{
        request(app)
        .post('/login')
        .send(rightData)
        .end((err,res) =>{
                const {body,status} =res

                if(err){
                    body(err)
                }
                console.log(status, "login")
                console.log(body,"login")
                expect(status).toBe(200)
                expect(body).toHaveProperty("access_token",expect.any(String))
                done()
            })
    })
})

describe ('Failed login', () =>{

    test('Wrong email', (done) =>{
        request(app)
            .post('/login')
            .send(wrongEmail)
            .end((err,res) =>{
                const {body,status} = res
                if(err){
                    done(err)
                }

                expect(status).toBe(400)
                expect(body).toHaveProperty("msg", "wrong email/password")
                done()
            })
    })

    test('Wrong password', (done) =>{
        request(app)
            .post('/login')
            .send(wrongPassword)
            .end((err,res) =>{
                const {body,status} = res
                if(err){
                    done(err)
                }

                expect(status).toBe(400)
                expect(body).toHaveProperty("msg", "wrong email/password")
                done()
            })
    })

    test('empty password', (done) =>{
        request(app)
            .post('/login')
            .send(emptyPassword)
            .end((err,res) =>{
                const {body,status} = res
                if(err){
                    done(err)
                }

                expect(status).toBe(400)
                expect(body).toHaveProperty("msg", "wrong email/password")
                done()
            })
    })


    test('empty email', (done) =>{
        request(app)
            .post('/login')
            .send(emptyEmail)
            .end((err,res) =>{
                const {body,status} = res
                if(err){
                    done(err)
                }

                expect(status).toBe(400)
                expect(body).toHaveProperty("msg", "wrong email/password")
                done()
            })
    })

    test('empty field', (done) =>{
        request(app)
            .post('/login')
            .send(emptyField)
            .end((err,res) =>{
                const {body,status} = res
                if(err){
                    done(err)
                }
                console.log(body, '<<< BODY <<<')
                expect(status).toBe(400)
                expect(body).toHaveProperty("msg", "wrong email/password")
                done()
            })
    })

})