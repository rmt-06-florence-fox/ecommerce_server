const request = require('supertest')
const app = require('../app')
const { User, Product, sequelize } = require('../models')
const { queryInterface } = sequelize
const { generateToken } = require('../helpers')
// const { TestScheduler } = require('jest')

const emails = [
  'admin@mail.com',
  'customer@mail.com',
  'admin2@mail.com',
  'customer2@mail.com'
]

const items = [
  { // Success Add Product //
    name: 'Croissant',
    image_url: 'https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8Y3JvaXNzYW50fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    price: 23000,
    stock: 50
  },
  { // Failed Add product > Missing information >  Blank Data //
    name: '',
    image_url: '',
    price: '',
    stock: ''
  },
  { // Failed Add Product > Missing information > Blank Name//
    name: '',
    image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8YmFrZXJ5fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    price: 15000,
    stock: 100
  },
  { // Failed Add Product > Missing information >  Blank Price//
    name: 'Macaron',
    image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8YmFrZXJ5fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    price: '',
    stock: 100
  },
  { // Failed Add Product > Missing information > Blank Stock//
    name: 'Macaron 2',
    image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8YmFrZXJ5fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    price: 15000,
    stock: ''
  },
  { // Failed Add Product > Invalid Value > Price mcannot be negative//
    name: 'Macaron 3',
    image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8YmFrZXJ5fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    price: -15000,
    stock: 100
  },
  { // Failed Add Product > Invalid Value > Stock cannot be negative //
    name: 'Macaron 2',
    image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8YmFrZXJ5fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    price: 15000,
    stock: -100
  },
  { // Failed Add Product > Invalid Value > Price  must be Integer //
    name: 'Macaron 3',
    image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8YmFrZXJ5fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    price: 'Tiga Ribu Rupiah',
    stock: 100
  },
  { // Failed Add Product > Invalid Value > Stock  must be Integer //
    name: 'Macaron 4',
    image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8YmFrZXJ5fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    price: 15000,
    stock: 'Seratus buah'
  }

]

const edits = [
  { // Success Edit Product //
    name: 'Strawberry Pancake',
    image_url: 'https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8Y3JvaXNzYW50fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    price: 50000,
    stock: 20
  },
  { // Failed Edit product > Invalid Value > Price cannot be negative //
    name: 'Strawberry Pancake',
    image_url: 'https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8Y3JvaXNzYW50fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    price: -5000,
    stock: 50
  },
  { // Failed Edit product > Invalid Value > Stock cannot be negative //
    name: 'Strawberry Pancake',
    image_url: 'https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8Y3JvaXNzYW50fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    price: 5000,
    stock: -50
  },
  { // Failed Edit product > Invalid Value > Stock must be integer//
    name: 'Strawberry Pancake',
    image_url: 'https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8Y3JvaXNzYW50fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    price: 5000,
    stock: 'lima puluh buah'
  },
]

const users = []

let productId = ''

beforeAll(done => {
  emails.forEach(email => {
    User.findOne({ where: { email } })
      .then(data => {
        const access_token = generateToken({
          id: data.id,
          email: data.email,
          role: data.role
        })
        users.push({
          access_token,
          role: data.role,
          email: data.email
        })
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})


// --- CREATE PRODUCT TEST > POST /products --- //

describe('Test POST /products', () => {
  describe('Customer', () => {
    items.forEach(item => {
      test('Not Allowed', (done) => {
        users.forEach(user => {
          if (user.role == 'Customer') {
            return request(app)
              .post('/products')
              .set('access_token', user.access_token)
              .set('Accept', 'application/json')
              .send(item)
              .then((res) => {
                const { status, body } = res
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', "You're not allowed to do this action")
                done()
              })
              .catch(err => {
                done(err)
              })
          }
          done()
        })
      })
    })
  })

  describe('Admin', () => {
    for (let i = 0; i < items.length; i++) {
      if (i == 0) {
        describe('Success Add product', () => {
          test('Completed', (done) => {
            users.forEach(user => {
              if (user.role == 'Admin') {
                return request(app)
                  .post('/products')
                  .set('access_token', user.access_token)
                  .set('Accept', 'application/json')
                  .send(items[i])
                  .then((res) => {
                    const { status, body } = res
                    let id = body.newProduct.id
                    expect(status).toBe(201)
                    expect(body).toHaveProperty('message', 'Success add product')
                    expect(body).toHaveProperty('newProduct', expect.any(Object))
                    productId = id
                    done()
                  })
                  .catch(err => {
                    done(err)
                  })
              }
            })
          })
        })
      } else {
        describe('Failed Add product', () => {
          if (i <= 4) {
            describe('Missing Information', () => {
              if (i == 1) {
                test('Blank Data', (done) => {
                  users.forEach(user => {
                    if (user.role == 'Admin') {
                      return request(app)
                        .post('/products')
                        .set('access_token', user.access_token)
                        .set('Accept', 'application/json')
                        .send(items[i])
                        .then((res) => {
                          const { status, body } = res
                          expect(status).toBe(400)
                          expect(body).toContainEqual({ message: 'Name cannot be empty' })
                          expect(body).toContainEqual({ message: 'Price cannot be empty' })
                          expect(body).toContainEqual({ message: 'Stock cannot be empty' })
                          done()
                        })
                        .catch(err => {
                          done(err)
                        })
                    }
                  })
                })
              } else if (i == 2) {
                test('Blank Name', (done) => {
                  users.forEach(user => {
                    if (user.role == 'Admin') {
                      return request(app)
                        .post('/products')
                        .set('access_token', user.access_token)
                        .set('Accept', 'application/json')
                        .send(items[i])
                        .then((res) => {
                          const { status, body } = res
                          expect(status).toBe(400)
                          expect(body).toContainEqual({ message: 'Name cannot be empty' })
                          done()
                        })
                        .catch(err => {
                          done(err)
                        })
                    }
                  })
                })
              } else if (i == 2) {
                test('Blank Price', (done) => {
                  users.forEach(user => {
                    if (user.role == 'Admin') {
                      return request(app)
                        .post('/products')
                        .set('access_token', user.access_token)
                        .set('Accept', 'application/json')
                        .send(items[i])
                        .then((res) => {
                          const { status, body } = res
                          expect(status).toBe(400)

                          expect(body).toContainEqual({ message: 'Price cannot be empty' })
                          done()
                        })
                        .catch(err => {
                          done(err)
                        })
                    }
                  })
                })
              } else if (i == 2) {
                test('Blank Stock', (done) => {
                  users.forEach(user => {
                    if (user.role == 'Admin') {
                      return request(app)
                        .post('/products')
                        .set('access_token', user.access_token)
                        .set('Accept', 'application/json')
                        .send(items[i])
                        .then((res) => {
                          const { status, body } = res
                          expect(status).toBe(400)
                          expect(body).toContainEqual({ message: 'Stock cannot be empty' })
                          done()
                        })
                        .catch(err => {
                          done(err)
                        })
                    }
                  })
                })
              }
            })
          }
          if (i > 4) {
            describe('Invalid Value', () => {
              if (i == 5) {
                test('Price cannot be negative', (done) => {
                  users.forEach(user => {
                    if (user.role == 'Admin') {
                      return request(app)
                        .post('/products')
                        .set('access_token', user.access_token)
                        .set('Accept', 'application/json')
                        .send(items[i])
                        .then((res) => {
                          const { status, body } = res
                          expect(status).toBe(400)
                          expect(body).toContainEqual({ message: 'Price cannot be negative' })
                          done()
                        })
                        .catch(err => {
                          done(err)
                        })
                    }
                  })
                })
              } else if (i == 6) {
                test('Stock cannot be negative', (done) => {
                  users.forEach(user => {
                    if (user.role == 'Admin') {
                      return request(app)
                        .post('/products')
                        .set('access_token', user.access_token)
                        .set('Accept', 'application/json')
                        .send(items[i])
                        .then((res) => {
                          const { status, body } = res
                          expect(status).toBe(400)
                          expect(body).toContainEqual({ message: 'Stock cannot be negative' })
                          done()
                        })
                        .catch(err => {
                          done(err)
                        })
                    }
                  })
                })
              } else if (i == 7) {
                test('Price must be integer', (done) => {
                  users.forEach(user => {
                    if (user.role == 'Admin') {
                      return request(app)
                        .post('/products')
                        .set('access_token', user.access_token)
                        .set('Accept', 'application/json')
                        .send(items[i])
                        .then((res) => {
                          const { status, body } = res
                          expect(status).toBe(400)
                          expect(body).toContainEqual({ message: 'Price must be Number' })
                          done()
                        })
                        .catch(err => {
                          done(err)
                        })
                    }
                  })
                })
              } else {
                test('Stock must be integer', (done) => {
                  users.forEach(user => {
                    if (user.role == 'Admin') {
                      return request(app)
                        .post('/products')
                        .set('access_token', user.access_token)
                        .set('Accept', 'application/json')
                        .send(items[i])
                        .then((res) => {
                          const { status, body } = res
                          expect(status).toBe(400)
                          expect(body).toContainEqual({ message: 'Stock must be Number' })
                          done()
                        })
                        .catch(err => {
                          done(err)
                        })
                    }
                  })
                })
              }
            })
          }
        })
      }
    }
  })

})

// --- END OF CREATE PRODUCT TEST > POST /products --- //

// --- SHOW PRODUCT TEST > POST / products--- //

describe('Test GET /products', () => {
  describe('Customer', () => {
    test('Not Allowed', (done) => {
      users.forEach(user => {
        if (user.role == 'Customer') {
          return request(app)
            .get('/products')
            .set('access_token', user.access_token)
            .then(res => {
              const { status, body } = res
              expect(status).toBe(401)
              expect(body).toHaveProperty('message', "You're not allowed access this page")
              done()
            })
            .catch(err => {
              done(err)
            })
        }
        done()
      })

    })
  })

  describe('Admin', () => {
    test('Succees show products', (done) => {
      users.forEach(user => {
        if (user.role == 'Admin') {
          return request(app)
            .get('/products')
            .set('access_token', user.access_token)
            .then(res => {
              const { status, body } = res
              expect(status).toBe(200)
              expect(body).toEqual(expect.arrayContaining([]))
              done()
            })
            .catch(err => {
              done(err)
            })
        }
        done()
      })

    })
  })
})

// --- END OF SHOW PRODUCT TEST > POST / products--- //

// --- UPDATE PRODUCT TEST > POST / products--- //

describe('Test PUT /products', () => {
  describe('Customer', () => {
    edits.forEach(edit => {
      test('Not Allowed', (done) => {
        users.forEach(async user => {
          if (user.role == 'Customer') {
            try {
              const res = await request(app)
                .put(`/products/${productId}`)
                .set('access_token', user.access_token)
                .set('Accept', 'application/json')
                .send(edit)
              const { status, body } = res
              expect(status).toBe(401)
              expect(body).toHaveProperty('message', "You're not allowed access this page")
              done()
            } catch (err) {
              done(err)
            }
          }
          done()
        })
      })
    })
  })

  describe('Admin', () => {
    for (let j = 0; j < edits.length; j++) {
      if (j == 0) {
        describe('Success Edit product', () => {
          test('Completed', (done) => {
            users.forEach(async user => {
              if (user.role == 'Admin') {
                try {
                  const res = await request(app)
                    .put(`/products/${productId}`)
                    .set('access_token', user.access_token)
                    .set('Accept', 'application/json')
                    .send(edits[j])
                  const { status, body } = res
                  expect(status).toBe(200)
                  expect(body).toHaveProperty('message', 'Update Success')
                  expect(body).toHaveProperty('updated', expect.any(Object))
                  done()
                } catch (err) {
                  done(err)
                }
              }
            })
          })
        })
      } else {
        describe('Failed Edit product', () => {
          describe('Invalid Value', () => {
            if (j == 1) {
              test('Price cannot be negative', (done) => {
                users.forEach(user => {
                  if (user.role == 'Admin') {
                    return request(app)
                      .put(`/products/${productId}`)
                      .set('access_token', user.access_token)
                      .set('Accept', 'application/json')
                      .send(edits[j])
                      .then((res) => {
                        const { status, body } = res
                        expect(status).toBe(400)
                        expect(body).toContainEqual({ message: 'Price cannot be negative' })
                        done()
                      })
                      .catch(err => {
                        done(err)
                      })
                  }
                })
              })
            } else if (j == 2) {
              test('Stock cannot be negative', (done) => {
                users.forEach(user => {
                  if (user.role == 'Admin') {
                    return request(app)
                      .put(`/products/${productId}`)
                      .set('access_token', user.access_token)
                      .set('Accept', 'application/json')
                      .send(edits[j])
                      .then((res) => {
                        const { status, body } = res
                        expect(status).toBe(400)
                        expect(body).toContainEqual({ message: 'Stock cannot be negative' })
                        done()
                      })
                      .catch(err => {
                        done(err)
                      })
                  }
                })
              })
            } else if (j == 3) {
              test('Stock must be integer', (done) => {
                users.forEach(user => {
                  if (user.role == 'Admin') {
                    return request(app)
                      .put(`/products/${productId}`)
                      .set('access_token', user.access_token)
                      .set('Accept', 'application/json')
                      .send(edits[j])
                      .then((res) => {
                        const { status, body } = res
                        expect(status).toBe(400)
                        expect(body).toContainEqual({ message: 'Stock must be Number' })
                        done()
                      })
                      .catch(err => {
                        done(err)
                      })
                  }
                })
              })
            } 
          })
        })
      }
    }
  })

})

// --- END OF UPDATE PRODUCT TEST > POST / products--- //

afterAll(done => {
  queryInterface.bulkDelete('Products')
    .then(data => {
      done()
    })
    .catch(err => {
      done(err)
    })
})

