const request = require('supertest')
const app = require('../app')
const {sequelize} = require('../models/index')
const { queryInterface } = sequelize
const {hash} = require('../helpers/encryption') 
const {tokenize} = require('../helpers/tokening')
let token_admin;
let token_user;
let productId;


afterAll(done =>{
   queryInterface
      .bulkDelete("Users")
      .then(response => {
         return queryInterface.bulkDelete('Products')
      })
      .then(response =>{
         done()
      })
      .catch(err => {
         console.log(err)
      })

})

beforeAll(done =>{
   queryInterface.bulkInsert('Users',[
      {
         email:'admin@gmail.com',
         password: hash('password1234'),
         role:'admin',
         createdAt:new Date(),
         updatedAt: new Date()
      },
      {
         email:'user@gmail.com',
         password: hash('password1234'),
         role:'customer',
         createdAt:new Date(),
         updatedAt: new Date()
      },
   ],{
      returning: true
   })
   .then(response =>{
      console.log(response)
      token_admin = tokenize({
         id:response[0].id,
         email:response[0].email,
         role:response[0].role
      })
      token_user = tokenize({
         id:response[1].id,
         email:response[1].email,
         role:response[1].role
      })

      console.log(token_admin,"<<<<<token admin")
      console.log(token_user,"<<<<<token user")
      return queryInterface.bulkInsert('Products',[
         {
            name:'Buku',
            image_url:"www.hahah.com/test.jpet",
            price:50000,
            stock:50,
            createdAt:new Date(),
            updatedAt: new Date()
         }
      ],{returning:true})
   })
   .then(response =>{
      productId = response[0].id
      done()
   })
   .catch(err =>{
      done(err)
   })

})


describe("Create Product POST /products",() => {
   describe("Success Create Product",() =>{
      test("create product with valid body value",done =>{
         request(app)
            .post('/products')
            .set('access_token',token_admin)
            .send({name:'Buku',image_url:"www.hahah.com/test.jpet",price:50000,stock:50})
            .end((err,res) =>{
               const { body,status } = res
               if(err)
                  return done(err)
               
               
               expect(status).toBe(201)
               expect(body).toHaveProperty('name','Buku')
               // expect(body).toHaveProperty('image_url',"www.hahah.com/test.jpet")
               // expect(body).toHaveProperty('price',50000)
               // expect(body).toHaveProperty('stock',50)
               done()
            })
      })
   }),
   describe("Fail Create Product",()=>{
      describe("Not having token",() =>{
         test("access without token",done =>{
            request(app)
            .post('/products')
            .send({
               name:'Buku',
               image_url:"www.hahah.com/test.jpet",
               price:50000,
               stock:50
            })
            .end((err,res) =>{
               const { body,status } = res
               if(err)
                  return done(err)
               
               console.log(body,"<<<<<")
               console.log(status,"<<<<<")
               expect(status).toBe(400)
               expect(body).toHaveProperty('message','You must login first')
               done()
            })
         })
      }),
      describe("Not Admin's Token",() =>{
         test("login user with Customer Token",done =>{
            request(app)
            .post('/products')
            .set('access_token',token_user)
            .send({
               name:'Buku',
               image_url:"www.hahah.com/test.jpet",
               price:50000,
               stock:50
            })
            .end((err,res) =>{
               const { body,status } = res
               if(err)
                  return done(err)
               
               
               expect(status).toBe(400)
               expect(body).toHaveProperty(
                  'message',
                  'You are not authorized to add/edit/update/delete product'
               )
               done()
            })
         })
      }),
      describe("Missing Required Field",() =>{
         test("User input missing required field",done =>{
            request(app)
            .post('/products')
            .set('access_token',token_admin)
            .send({
               name:'',
               image_url:"www.hahah.com/test.jpet",
               price:50000,
               stock:50
            })
            .end((err,res) =>{
               const { body,status } = res
               if(err)
                  return done(err)
               
               
               expect(status).toBe(400)
               expect(body).toHaveProperty('message','name must be filled')
               done()
            })
         })
      }),
      describe("Negative Number in Integer Field",() =>{
         test("User input negative number on stock or price",done =>{
            request(app)
            .post('/products')
            .set('access_token',token_admin)
            .send({
               name:'Buku',
               image_url:"www.hahah.com/test.jpet",
               price:-100,
               stock:50
            })
            .end((err,res) =>{
               const { body,status } = res
               if(err)
                  return done(err)
               
               expect(status).toBe(400)
               expect(body).toHaveProperty(
                  'message',
                  "stock/price can't be less than 0"
               )
               done()
            })
         })
      }),
      describe("Wrong Type Input",() =>{
         test("User input string on integer field",done =>{
            request(app)
            .post('/products')
            .set('access_token',token_admin)
            .send({
               name:'Buku',
               image_url:"www.hahah.com/test.jpet",
               price: 10000,
               stock:"string"
            })
            .end((err,res) =>{
               const { body,status } = res
               if(err)
                  return done(err)
               
               expect(status).toBe(400)
               expect(body).toHaveProperty(
                  'message',
                  "stock/price must be a number"
               )
               done()
            })
         })
      })
   })
})

describe("Update Product PUT /products/:id",() => {
   describe("Success Update Product",() =>{
      test("create product with valid body value",done =>{
         request(app)
            .put('/products/'+productId)
            .set('access_token',token_admin)
            .send({name:'Buku Edit',image_url:"www.hahah.com/test.jpet",price:50000,stock:50})
            .end((err,res) =>{
               const { body,status } = res
               if(err)
                  return done(err)
               
               
               expect(status).toBe(201)
               expect(body).toHaveProperty('name','Buku Edit')
               expect(body).toHaveProperty('image_url',"www.hahah.com/test.jpet")
               expect(body).toHaveProperty('price',50000)
               expect(body).toHaveProperty('stock',50)
               done()
            })
      })
   }),
   describe("Fail Update Product",()=>{
      describe("Not having token",() =>{
         test("access without token",done =>{
            request(app)
            .put('/products/'+productId)
            .send({
               name:'Buku',
               image_url:"www.hahah.com/test.jpet",
               price:50000,
               stock:50
            })
            .end((err,res) =>{
               const { body,status } = res
               if(err)
                  return done(err)
               
               console.log(body,"<<<<<")
               console.log(status,"<<<<<")
               expect(status).toBe(400)
               expect(body).toHaveProperty('message','You must login first')
               done()
            })
         })
      }),
      describe("Not Admin's Token",() =>{
         test("login user with Customer Token",done =>{
            request(app)
            .put('/products/'+productId)
            .set('access_token',token_user)
            .send({
               name:'Buku',
               image_url:"www.hahah.com/test.jpet",
               price:50000,
               stock:50
            })
            .end((err,res) =>{
               const { body,status } = res
               if(err)
                  return done(err)
               
               
               expect(status).toBe(400)
               expect(body).toHaveProperty(
                  'message',
                  'You are not authorized to add/edit/update/delete product'
               )
               done()
            })
         })
      }),
      describe("Missing Required Field",() =>{
         test("User input missing required field",done =>{
            request(app)
            .put('/products/'+productId)
            .set('access_token',token_admin)
            .send({
               name:'',
               image_url:"www.hahah.com/test.jpet",
               price:50000,
               stock:50
            })
            .end((err,res) =>{
               const { body,status } = res
               if(err)
                  return done(err)
               
               
               expect(status).toBe(400)
               expect(body).toHaveProperty('message','name must be filled')
               done()
            })
         })
      }),
      describe("Negative Number in Integer Field",() =>{
         test("User input negative number on stock or price",done =>{
            request(app)
            .put('/products/'+productId)
            .set('access_token',token_admin)
            .send({
               name:'Buku',
               image_url:"www.hahah.com/test.jpet",
               price:-100,
               stock:50
            })
            .end((err,res) =>{
               const { body,status } = res
               if(err)
                  return done(err)
               
               expect(status).toBe(400)
               expect(body).toHaveProperty(
                  'message',
                  "stock/price can't be less than 0"
               )
               done()
            })
         })
      }),
      describe("Wrong Type Input",() =>{
         test("User input string on integer field",done =>{
            request(app)
            .put('/products/'+productId)
            .set('access_token',token_admin)
            .send({
               name:'Buku',
               image_url:"www.hahah.com/test.jpet",
               price: 10000,
               stock:"string"
            })
            .end((err,res) =>{
               const { body,status } = res
               if(err)
                  return done(err)
               
               expect(status).toBe(400)
               expect(body).toHaveProperty(
                  'message',
                  "stock/price must be a number"
               )
               done()
            })
         })
      })
   })
})


describe("Delete Product DELETE /products/:id",() => {
   describe("Success Delete Product",() =>{
      test("Delete product with valid value",done =>{
         request(app)
            .delete('/products/'+productId)
            .set('access_token',token_admin)
            .end((err,res) =>{
               const { body,status } = res
               if(err)
                  return done(err)
               
               expect(status).toBe(200)
               expect(body).toHaveProperty('message','Resource Deleted Successfully')
               done()
            })
      })
   }),
   describe("Fail Update Product",()=>{
      describe("Not having token",() =>{
         test("access without token",done =>{
            request(app)
            .delete('/products/'+productId)
            .end((err,res) =>{
               const { body,status } = res
               if(err)
                  return done(err)
               
               console.log(body,"<<<<<")
               console.log(status,"<<<<<")
               expect(status).toBe(400)
               expect(body).toHaveProperty('message','You must login first')
               done()
            })
         })
      }),
      describe("Not Admin's Token",() =>{
         test("login user with Customer Token",done =>{
            request(app)
            .delete('/products/'+productId)
            .set('access_token',token_user)
            .end((err,res) =>{
               const { body,status } = res
               if(err)
                  return done(err)
               
               
               expect(status).toBe(400)
               expect(body).toHaveProperty(
                  'message',
                  'You are not authorized to add/edit/update/delete product'
               )
               done()
            })
         })
      })
   })
})


