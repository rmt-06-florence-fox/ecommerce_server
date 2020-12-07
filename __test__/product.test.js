const request = require('supertest')
const app = require('../app')
const {sequelize} = require('../models')
const {queryInterface} = sequelize
let access_token
let access_token_user
let productId

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

describe('route post /products', ()=>{
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
          productId = res.body.id
          const { body , status} =  res
          expect(status).toBe(201)
          expect(body).toHaveProperty('id')
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

    test('empty input name', (done)=>{
      request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({
          name : '',
          image_url : 'https://ecs7.tokopedia.net/img/cache/900/product-1/2018/5/25/10897244/10897244_f9732383-bd09-4102-b740-75aab701b410_800_800.jpg',
          price : 10000,
          stock : 10
        })
        .end((err , res)=>{
          const {status, body} = res
          if(err) return done(err)
          expect(status).toBe(400)
          expect(body).toHaveProperty('messages', ['name can not be empty'])
          done()
        })
    });

    test('empty input image_url', (done)=>{
      request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({
          name : 'groot',
          image_url : '',
          price : 10000,
          stock : 10
        })
        .end((err , res)=>{
          const {status, body} = res
          if(err) return done(err)
          expect(status).toBe(400)
          expect(body).toHaveProperty('messages', ['image_url can not be empty'])
          done()
        })
    });

    test('minus stock input', (done)=>{
      request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({
          name : 'groot',
          image_url : 'https://ecs7.tokopedia.net/img/cache/900/product-1/2018/5/25/10897244/10897244_f9732383-bd09-4102-b740-75aab701b410_800_800.jpg',
          price : 10000,
          stock : -10
        })
        .end((err , res)=>{
          const {status, body} = res
          if(err) return done(err)
          expect(status).toBe(400)
          expect(body).toHaveProperty('messages', ['stock can not lower than 0'])
          done()
        })
    });

    test('minus stock input', (done)=>{
      request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({
          name : 'groot',
          image_url : 'https://ecs7.tokopedia.net/img/cache/900/product-1/2018/5/25/10897244/10897244_f9732383-bd09-4102-b740-75aab701b410_800_800.jpg',
          price : -10000,
          stock : 10
        })
        .end((err , res)=>{
          const {status, body} = res
          if(err) return done(err)
          expect(status).toBe(400)
          expect(body).toHaveProperty('messages', ['price can not lower than 0'])
          done()
        })
    });

    test('input not number on price', (done)=>{
      request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({
          name : 'groot',
          image_url : 'https://ecs7.tokopedia.net/img/cache/900/product-1/2018/5/25/10897244/10897244_f9732383-bd09-4102-b740-75aab701b410_800_800.jpg',
          price : "seribu",
          stock : 10
        })
        .end((err , res)=>{
          const {status, body} = res
          if(err) return done(err)
          expect(status).toBe(400)
          expect(body).toHaveProperty('messages', ['price must be a number'])
          done()
        })
    });

    test('input not number on stock', (done)=>{
      request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({
          name : 'groot',
          image_url : 'https://ecs7.tokopedia.net/img/cache/900/product-1/2018/5/25/10897244/10897244_f9732383-bd09-4102-b740-75aab701b410_800_800.jpg',
          price : 10000,
          stock : "sepuluh"
        })
        .end((err , res)=>{
          const {status, body} = res
          if(err) return done(err)
          expect(status).toBe(400)
          expect(body).toHaveProperty('messages', ['stock must be a number'])
          done()
        })
    });


  })

})

describe('route put /products/:id', ()=>{

  describe('success update',  ()=>{
    test('success update',(done)=>{
      request(app)
      .put(`/products/${productId}`)
      .set('access_token', access_token)
      .send({
        name : 'groot2',
        image_url : 'https://ecs7.tokopedia.net/img/cache/900/product-1/2018/5/25/10897244/10897244_f9732383-bd09-4102-b740-75aab701b410_800_800.jpg',
        price : 20000,
        stock : 20
      })
      .end((err,res)=>{
        if(err) return done(err)
        const { body , status} =  res
        expect(status).toBe(200)
        done()
      })
    })
    
  })

  describe('fail update', ()=>{
    test('no access token',(done)=>{
      request(app)
      .put(`/products/${productId}`)
      .send({
        name : 'groot2',
        image_url : 'https://ecs7.tokopedia.net/img/cache/900/product-1/2018/5/25/10897244/10897244_f9732383-bd09-4102-b740-75aab701b410_800_800.jpg',
        price : 20000,
        stock : 20
      })
      .end((err,res)=>{
        const {status, body} = res
        if(err) return done(err)
        expect(status).toBe(401)
        expect(body).toHaveProperty('message', 'please login first')
        done()
      })
    })

    test('wrong access token',(done)=>{
      request(app)
      .post(`/products/${productId}`)
      .set('access_token', access_token_user)
      .send({
        name : 'groot2',
        image_url : 'https://ecs7.tokopedia.net/img/cache/900/product-1/2018/5/25/10897244/10897244_f9732383-bd09-4102-b740-75aab701b410_800_800.jpg',
        price : 20000,
        stock : 20
      })
      .end((err,res)=>{
        const {status, body} = res
        if(err) return done(err)
        expect(status).toBe(401)
        expect(body).toHaveProperty('message', 'you are not an admin')
        done()
      })
    })

    test('minus on stock input',(done)=>{
      request(app)
      .put(`/products/${productId}`)
      .set('access_token', access_token)
      .send({
        name : 'groot2',
        image_url : 'https://ecs7.tokopedia.net/img/cache/900/product-1/2018/5/25/10897244/10897244_f9732383-bd09-4102-b740-75aab701b410_800_800.jpg',
        price : 20000,
        stock : -20
      })
      .end((err,res)=>{
        const {status, body} = res
        if(err) return done(err)
        expect(status).toBe(400)
        expect(body).toHaveProperty('messages', ['stock can not lower than 0'])
        done()
      })
    })

    test('minus on price input',(done)=>{
      request(app)
      .put(`/products/${productId}`)
      .set('access_token', access_token)
      .send({
        name : 'groot2',
        image_url : 'https://ecs7.tokopedia.net/img/cache/900/product-1/2018/5/25/10897244/10897244_f9732383-bd09-4102-b740-75aab701b410_800_800.jpg',
        price : -20000,
        stock : 20
      })
      .end((err,res)=>{
        const {status, body} = res
        if(err) return done(err)
        expect(status).toBe(400)
        expect(body).toHaveProperty('messages', ['price can not lower than 0'])
        done()
      })
    })

    test('weird input',(done)=>{
      request(app)
      .put(`/products/${productId}`)
      .set('access_token', access_token)
      .send({
        name : 'groot2',
        image_url : 'https://ecs7.tokopedia.net/img/cache/900/product-1/2018/5/25/10897244/10897244_f9732383-bd09-4102-b740-75aab701b410_800_800.jpg',
        price : "duapuluhribu",
        stock : "sepuluh"
      })
      .end((err,res)=>{
        const {status, body} = res
        if(err) return done(err)
        expect(status).toBe(400)
        expect(body).toHaveProperty('messages')
        done()
      })
    })
  })
})

describe('route delete /products/:id', ()=>{
  describe('delete success',()=>{
    test('delete success',(done)=>{
      request(app)
        .delete(`/products/${productId}`)
        .set('access_token', access_token)
        .end((err, res)=>{
          if(err) return done(err)
          const { body , status} =  res
          expect(status).toBe(200)
          expect(body).toHaveProperty('message','succesfully delete a product')
          done()
        })
    })
  })

  describe('delete fail', ()=>{
    test('no access token',(done)=>{
      request(app)
        .delete(`/products/${productId}`)
        .end((err, res)=>{
        const {status, body} = res
        if(err) return done(err)
        expect(status).toBe(401)
        expect(body).toHaveProperty('message', 'please login first')
        done()
        })
    })

    test('wrong access token',(done)=>{
      request(app)
        .delete(`/products/${productId}`)
        .set('access_token', access_token_user)
        .end((err, res)=>{
        const {status, body} = res
        if(err) return done(err)
        expect(status).toBe(401)
        expect(body).toHaveProperty('message', 'you are not an admin')
        done()
        })
    })
  })

})

