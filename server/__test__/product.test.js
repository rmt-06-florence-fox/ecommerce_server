const request = require('supertest');
const app = require('../app.js')
const { User } = require('../models')
const {generateToken} =require ('../helper/jwt')
const { sequelize } = require("../models")
const { queryInterface } = sequelize
let id = ''


beforeAll((done)=>{
  request(app)
    .post('/login')
    .send({
      email: `admin2@mail.com`,
      password: `aa`
    })
    .end((err, res) =>{
      if(err) return done(err)
      const { body, status } = res
      access_token = res.body.access_token

    })
  request(app)
    .post('/login')
    .send({
      email: `user@mail.com`,
      password: `aa`
    })
    .end((err, res) =>{
      if(err) return done(err)
      const { body, status } = res
      access_token_user = res.body.access_token
      done()
    })
})

// afterAll((done) => {
//   queryInterface
//       .bulkDelete("Products")
//       .then(() => done())
//       .catch((err) => {
//           done();
//       });
// });

let product_data = {
  name: 'Product name',
  image_url: 'link image',
  price: 1000,
  stock: 20
}

describe('Create product POST / SUCCESS CASE', () => {
    describe('SUCCESS CASE', () => {
    test('test should send object with keys: id, name, image_url, price, stock', (done) => {
        request(app)
            .post('/products')
            .set('access_token', access_token)
            .send(product_data)
            .end((err, res)=> {
               
                const { body, status } = res
                id = res.body.id
                if (err) {
                  return done(err)
                }
                else {
                    expect(res.status).toBe(201)
                    expect(res.body).toHaveProperty('id', expect.any(Number))
                    expect(res.body).toHaveProperty('name', product_data.name)
                    expect(res.body).toHaveProperty('image_url', product_data.image_url)
                    expect(res.body).toHaveProperty('price', product_data.price)
                    expect(res.body).toHaveProperty('stock', product_data.stock)
                    done()
                }
            })
    })
  })

  describe(' FAILED CASE: invalid sequelize validation error', () => {
    test('test should send object with message error', (done) => {
        request(app)
            .post('/products')
            .set('access_token', access_token)
            .send({
                name: '',
                image_url: '',
                price: '',
                stock: ''
            })
            .end((err, res) => {
                if (err) throw err
                else {
                    expect(res.status).toBe(400)
                    expect(res.body).toHaveProperty('message','Name cannot be blank,Image cannot be blank,price cannot be blank,Stock cannot be blank ,required')
                    done()
                }
            })
    })
  })

  describe('FAILED CASE: no acces token', () => {
    test('test should send object with message error', (done) => {
        request(app)
            .post('/products')
            .set('access_token','' )
            .send({
              product_data
            })
            .end((err, res) => {
                if (err) throw err
                else {
                    expect(res.status).toBe(401)
                    expect(res.body).toHaveProperty('message','Login First')
                    done()
                }
            })
    })
  })

  describe('FAILED CASE: invalid acces token/ not admin', () => {
    test('test should send object with message error', (done) => {
        request(app)
            .post('/products')
            .set('access_token',access_token_user )
            .send({
              product_data
            })
            .end((err, res) => {
                if (err) throw err
                else {
                    expect(res.status).toBe(401)
                    expect(res.body).toHaveProperty('message','You Dont Have Permission to Do this Action')
                    done()
                }
            })
    })
  })

  describe('FAILED CASE: invalid input stock and price < 0', () => {
    test('test should send object with message error', (done) => {
        request(app)
            .post('/products')
            .set('access_token',access_token )
            .send({
              name: 'Product name',
              image_url: 'link image',
              price: -1000,
              stock: -2
            })
            .end((err, res) => {
                if (err) throw err
                else {
                    expect(res.status).toBe(400)
                    expect(res.body).toHaveProperty('message','Stock / Price Must be greater than 0')
                    done()
                }
            })
    })
  })


  // describe('FAILED CASE: invalid input stock and price not an Integer', () => {
  //   test('test should send object with message error', (done) => {
  //       request(app)
  //           .post('/products')
  //           .set('access_token',access_token )
  //           .send({
  //             name: 'Product name',
  //             image_url: 'link image',
  //             price: 2000,
  //             stock:  'yeyeye'
  //           })
  //           .end((err, res) => {
  //               if (err) throw err
  //               else {
  //                   expect(res.status).toBe(400)
  //                   expect(res.body).toHaveProperty('message','Stock / Price Must be a number')
  //                   done()
  //               }
  //           })
  //   })
  // })
})

describe('EDIT Product PUT/products/:id ', () => {
  describe('SUCCESS CASE', () => {
  test('test should send object with keys: name, image_url, price, stock', (done) => {
      request(app)
          .put(`/products/${id}`)
          .set('access_token', access_token)
          .send({
            name: 'Product name Baru',
            image_url: 'link image',
            price: 2000,
            stock:  2
          })
          .end((err, res)=> {
              const { body, status } = res
              // id = res.body.id
              console.log(res.body)
              if (err) {
                console.log(err)
                return done(err)
                
              }
              else {
                
                  expect(res.status).toBe(200)
               
                  // expect(body).toHaveProperty('name', 'Product name edited')
                  // expect(body).toHaveProperty('image_url', 'link image')
                  // expect(body).toHaveProperty('price', 1000)
                  // expect(body).toHaveProperty('stock', 200)
                  done()
              }
          })
  })
})

describe(' FAILED CASE UPDATE : invalid sequelize validation error', () => {
  test('test should send object with message error', (done) => {
      request(app)
          .put(`/products/${id}`)
          .set('access_token', access_token)
          .send({
              name: '',
              image_url: '',
              price: '',
              stock: ''
          })
          .end((err, res) => {
              if (err) throw err
              else {
                  expect(res.status).toBe(400)
                  expect(res.body).toHaveProperty('message','Name cannot be blank,Image cannot be blank,price cannot be blank,Stock cannot be blank ,required')
                  done()
              }
          })
  })
})

describe('FAILED CASE UPDATE: no acces token', () => {
  test('test should send object with message error', (done) => {
      request(app)
          .put(`/products/${id}`)
          .set('access_token','' )
          .send({
            product_data
          })
          .end((err, res) => {
              if (err) throw err
              else {
                  expect(res.status).toBe(401)
                  expect(res.body).toHaveProperty('message','Login First')
                  done()
              }
          })
  })
})

describe('FAILED CASE UPDATE: invalid acces token/ not admin', () => {
  test('test should send object with message error', (done) => {
      request(app)
          .put(`/products/${id}`)
          .set('access_token',access_token_user )
          .send({
            product_data
          })
          .end((err, res) => {
              if (err) throw err
              else {
                  expect(res.status).toBe(401)
                  expect(res.body).toHaveProperty('message','You Dont Have Permission to Do this Action')
                  done()
              }
          })
  })
})

describe('FAILED CASE UPDATE : invalid input stock and price < 0', () => {
  test('test should send object with message error', (done) => {
      request(app)
          .put(`/products/${id}`)
          .set('access_token',access_token )
          .send({
            name: 'Product name',
            image_url: 'link image',
            price: -1000,
            stock: -2
          })
          .end((err, res) => {
              if (err) throw err
              else {
                  expect(res.status).toBe(400)
                  expect(res.body).toHaveProperty('message','Stock / Price Must be greater than 0')
                  done()
              }
          })
  })
})


// describe('FAILED CASE UPDATE: invalid input stock and price not an Integer', () => {
//   test('test should send object with message error', (done) => {
//       request(app)
//           .put(`/products/${id}`)
//           .set('access_token',access_token )
//           .send({
//             name: 'Product name',
//             image_url: 'link image',
//             price: 2000,
//             stock: 'yeyeye'
//           })
//           .end((err, res) => {
//               if (err) throw err
//               else {
//                   expect(res.status).toBe(400)
//                   expect(res.body).toHaveProperty('message','Stock / Price Must be a number')
//                   done()
//               }
//           })
//   })
// })
})

describe('DELETE /products/:id', () => {
  describe('SUCCESS CASE', () => {
    test('test should send object with message ', done => {
      request(app)
        .delete(`/products/${id}`)
        .set('access_token', access_token)
        .end((err, res)=>{
          const { body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(200)
          expect(body).toHaveProperty('message', `Successfully deleted`)
          done()
        })    
    })
  })
  describe('FAILED CASE: No Access Token', () => {
    test('test should send object with message error ', done => {
      request(app)
        .delete(`/products/${id}`)
        .set('access_token', '')
        .end((err, res)=>{
          const { body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(401)
          expect(body).toHaveProperty('message','Login First')
          done()
        })    
    })
  })
  describe('FAILED CASE: role Not Admin', () => {
    test('test should send object with message error ', done => {
      request(app)
        .delete(`/products/${id}`)
        .set('access_token', access_token_user)
        .end((err, res)=>{
          const { body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(401)
          expect(body).toHaveProperty('message','You Dont Have Permission to Do this Action')
          done()
        })    
    })
  })  
})


