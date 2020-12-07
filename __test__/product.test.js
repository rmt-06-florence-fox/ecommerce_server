const request = require('supertest')
const app = require('../app')
const {sequelize} = require('../models')
const {queryInterface} = sequelize
let access_token
let access_token_user

beforeAll((done)=>{
  request(app)
  .post('/login')
  .send({
    email : 'tio@mail.com',
    password : 'tiotio',
  })
  .end((err, res)=>{
    if(err) return done(err)
    access_token = res.body.access_token
  })

  request(app)
  .post('/login')
  .send({
    email : 'joko@mail.com',
    password : 'jokojoko',
  })
  .end((err, res)=>{
    if(err) return done(err)
    access_token_user = res.body.access_token
    done()
  })
  
})

afterAll(async ()=>{
  await queryInterface.bulkDelete('Products',null,{})
})

describe('route /products', ()=>{
  describe('success create',()=>{
    test('accepted value', (done)=>{
      request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({
          name : 'groot',
          image_url : 'https://ecs7.tokopedia.net/img/cache/900/product-1/2018/5/25/10897244/10897244_f9732383-bd09-4102-b740-75aab701b410_800_800.jpg',
          price : 10000,
          stock : 10
        })
        .end((err, res)=>{
          if(err) return done(err)

          const { body , status} =  res
          expect(status).toBe(201)
          expect(body).toHaveProperty('name', 'groot')
          expect(body).toHaveProperty('image_url', 'https://ecs7.tokopedia.net/img/cache/900/product-1/2018/5/25/10897244/10897244_f9732383-bd09-4102-b740-75aab701b410_800_800.jpg')
          expect(body).toHaveProperty('price', 10000)
          expect(body).toHaveProperty('stock', 10)
          done()
        })
    })
  })

  describe('fail create', ()=>{
    test('no access token', (done)=>{
      request(app)
        .post('/products')
        .send({
          name : 'groot',
          image_url : 'https://ecs7.tokopedia.net/img/cache/900/product-1/2018/5/25/10897244/10897244_f9732383-bd09-4102-b740-75aab701b410_800_800.jpg',
          price : 10000,
          stock : 10
        })
        .end((err , res)=>{
          const {status, body} = res
          if(err) return done(err)
          expect(status).toBe(401)
          expect(body).toHaveProperty('message', 'please login first')
          done()
        })
    });
  })

  describe('wrong access token', ()=>{
    test('wrong access token', (done)=>{
      request(app)
        .post('/products')
        .set('access_token', access_token_user)
        .send({
          name : 'groot',
          image_url : 'https://ecs7.tokopedia.net/img/cache/900/product-1/2018/5/25/10897244/10897244_f9732383-bd09-4102-b740-75aab701b410_800_800.jpg',
          price : 10000,
          stock : 10
        })
        .end((err , res)=>{
          const {status, body} = res
          if(err) return done(err)
          expect(status).toBe(401)
          expect(body).toHaveProperty('message', 'you are not an admin')
          done()
        })
    });
  })
  
})