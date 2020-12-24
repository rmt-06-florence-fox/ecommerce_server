const request = require('supertest')
const app = require('../app')
const {sequelize} = require('../models/index')
const { queryInterface } = sequelize

afterAll(done =>{
   queryInterface
      .bulkDelete("Users")
      .then(response => {
         done()
      })
      .catch(err => {
         done(err)
      })
})

describe("Create User POST /register",() => {
   describe("Success Create User",() =>{
      test("create user with valid body value",done =>{
         request(app)
            .post('/register')
            .send({email:'test@gmail.com',password:"password123"})
            .end((err,res) =>{
               const { body,status } = res
               if(err)
                  return done(err)
               
               
               expect(status).toBe(201)
               expect(body).toHaveProperty('email','test@gmail.com')
               done()
            })
      })
   }),
   describe("Fail Create User",()=>{
      describe("Invalid Email Format",() =>{
         test("create user with invalid email",done =>{
            request(app)
            .post('/register')
            .send({email:'test',password:"password123"})
            .end((err,res) =>{
               const { body,status } = res
               if(err)
                  return done(err)
               
               
               expect(status).toBe(400)
               expect(body).toHaveProperty('message','Wrong Email Format')
               done()
            })
         })
      }),
      describe("Duplicate Email",() =>{
         test("create user with invalid email",done =>{
            request(app)
            .post('/register')
            .send({email:'test@gmail.com',password:"password123"})
            .end((err,res) =>{
               const { body,status } = res
               if(err)
                  return done(err)
               
               
               expect(status).toBe(400)
               expect(body).toHaveProperty('message','email must be unique')
               done()
            })
         })
      })
   })
})

describe("Login User POST /login",() => {
   describe("Success Login User",() =>{
      test("login user with valid body value",done =>{
         request(app)
            .post('/login')
            .send({email:'test@gmail.com',password:"password123"})
            .end((err,res) =>{
               const { body,status } = res
               if(err)
                  return done(err)
               
               
               expect(status).toBe(200)
               expect(body).toHaveProperty('access_token')
               done()
            })
      })
   })
   describe("Fail Login User",()=>{
      describe("Invalid Password",() =>{
         test("login user with invalid email/password",done =>{
            request(app)
            .post('/login')
            .send({email:'test@gmail.com',password:"password12345"})
            .end((err,res) =>{
               const { body,status } = res
               if(err)
                  return done(err)
               
               console.log(body,"<<<<<")
               console.log(status,"<<<<<")
               expect(status).toBe(400)
               expect(body).toHaveProperty('message','Wrong Email/Password')
               done()
            })
         })
      }),
      describe("Email Not Found",() =>{
         test("login user with unregistered email",done =>{
            request(app)
            .post('/login')
            .send({email:'notfound@gmail.com',password:"password123"})
            .end((err,res) =>{
               const { body,status } = res
               if(err)
                  return done(err)
               
               
               expect(status).toBe(400)
               expect(body).toHaveProperty('message','Wrong Email/Password')
               done()
            })
         })
      }),
      describe("Email or Password not filled",() =>{
         test("login user with blank form",done =>{
            request(app)
            .post('/login')
            .send({email:'',password:""})
            .end((err,res) =>{
               const { body,status } = res
               if(err)
                  return done(err)
               
               
               expect(status).toBe(400)
               expect(body).toHaveProperty('message','Email/Password must be filled')
               done()
            })
         })
      })
   })
})


