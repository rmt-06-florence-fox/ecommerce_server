const request = require(`supertest`)
const app = require(`../app`)
const { User } = require('../models')
const { sequelize } = require(`../models/index`)
const { queryInterface } = sequelize
const { hash } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')

let access_token = ''
let cust_token = ''
let id

beforeAll(done => {
  let admin = {
    email: 'admin@mail.com',
    password: hash('123456'),
    role: 'admin'
  }

  let customer = {
    email: 'user@mail.com',
    password: hash('654321'),
    role: 'customer'
  }

  User.create(admin)
    .then(admin => {
      access_token = createToken({
        id: admin.id,
        email: admin.email
      })
      return User.create(customer)
    })
    .then(customer => {
      cust_token = createToken({
        id: customer.id,
        email: customer.email
      })
      done()
    })
    .catch(err => {
      done(err)
    })
})

afterAll(done => {
  queryInterface.bulkDelete('Products')
    .then(() => {
      return queryInterface.bulkDelete('Users')
    })
    .then(() => {
      done()
    })
    .catch(err => {
      done(err)
    })
})

describe('POST /products', () => {
  it('create product success', done => {
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send({
        name: 'tango',
        image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dotabuff.com%2Fplayers%2F185169023&psig=AOvVaw25Z2z9j4-J_MCNG3gGVVdJ&ust=1607587502505000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKiaxKS4wO0CFQAAAAAdAAAAABAD',
        price: 90000,
        stock: 100
      })
      .then(response => {
        let { body, status } = response
        id = +body.id
        expect(status).toBe(201)
        expect(body).toHaveProperty('id', expect.any(Number))
        expect(body).toHaveProperty('name', 'tango')
        expect(body).toHaveProperty('image_url', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dotabuff.com%2Fplayers%2F185169023&psig=AOvVaw25Z2z9j4-J_MCNG3gGVVdJ&ust=1607587502505000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKiaxKS4wO0CFQAAAAAdAAAAABAD')
        expect(body).toHaveProperty('price', 90000)
        expect(body).toHaveProperty('stock', 100)
        expect(body).toHaveProperty('UserId', expect.any(Number))
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('without access_token, create product fail', done => {
    request(app)
      .post('/products')
      .set('access_token', '')
      .send({
        name: 'Tango',
        image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dotabuff.com%2Fplayers%2F185169023&psig=AOvVaw25Z2z9j4-J_MCNG3gGVVdJ&ust=1607587502505000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKiaxKS4wO0CFQAAAAAdAAAAABAD',
        price: 90000,
        stock: 100
      })
      .then(response => {
        let { body, status } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty('error', 'Authentication failed')
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('not admin, create product fail', done => {
    request(app)
      .post('/products')
      .set('access_token', cust_token)
      .send({
        name: 'Tango',
        image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dotabuff.com%2Fplayers%2F185169023&psig=AOvVaw25Z2z9j4-J_MCNG3gGVVdJ&ust=1607587502505000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKiaxKS4wO0CFQAAAAAdAAAAABAD',
        price: 90000,
        stock: 100
      })
      .then(response => {
        let { body, status } = response
        expect(status).toBe(403)
        expect(body).toHaveProperty('error', 'Not Authorized')
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('empty name, create product fail', done => {
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send({
        name: '',
        image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dotabuff.com%2Fplayers%2F185169023&psig=AOvVaw25Z2z9j4-J_MCNG3gGVVdJ&ust=1607587502505000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKiaxKS4wO0CFQAAAAAdAAAAABAD',
        price: 90000,
        stock: 100
      })
      .then(response => {
        let { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('error', 'Require Product name')
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('empty image_url, create product fail', done => {
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send({
        name: 'Tango',
        image_url: '',
        price: 90000,
        stock: 100
      })
      .then(response => {
        let { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('error', 'Require Product image')
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('empty price, create product fail', done => {
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send({
        name: 'Tango',
        image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dotabuff.com%2Fplayers%2F185169023&psig=AOvVaw25Z2z9j4-J_MCNG3gGVVdJ&ust=1607587502505000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKiaxKS4wO0CFQAAAAAdAAAAABAD',
        price: null,
        stock: 100
      })
      .then(response => {
        let { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('error', 'Product.price cannot be null')
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('empty stock, create product fail', done => {
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send({
        name: 'Tango',
        image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dotabuff.com%2Fplayers%2F185169023&psig=AOvVaw25Z2z9j4-J_MCNG3gGVVdJ&ust=1607587502505000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKiaxKS4wO0CFQAAAAAdAAAAABAD',
        price: 90000,
        stock: null
      })
      .then(response => {
        let { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('error', 'Product.stock cannot be null')
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('minus price, create product fail', done => {
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send({
        name: 'Tango',
        image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dotabuff.com%2Fplayers%2F185169023&psig=AOvVaw25Z2z9j4-J_MCNG3gGVVdJ&ust=1607587502505000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKiaxKS4wO0CFQAAAAAdAAAAABAD',
        price: -90000,
        stock: 100
      })
      .then(response => {
        let { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('error', 'Price cant be minus')
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('minus stock, create product fail', done => {
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send({
        name: 'Tango',
        image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dotabuff.com%2Fplayers%2F185169023&psig=AOvVaw25Z2z9j4-J_MCNG3gGVVdJ&ust=1607587502505000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKiaxKS4wO0CFQAAAAAdAAAAABAD',
        price: 90000,
        stock: -100
      })
      .then(response => {
        let { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('error', 'Stock cant be minus')
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('price not number, create fail', done => {
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send({
        name: 'Tango',
        image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dotabuff.com%2Fplayers%2F185169023&psig=AOvVaw25Z2z9j4-J_MCNG3gGVVdJ&ust=1607587502505000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKiaxKS4wO0CFQAAAAAdAAAAABAD',
        price: 'asdasdafda',
        stock: 100
      })
      .then(response => {
        let { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('error', 'Price must be a number')
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('stock not number, create fail', done => {
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send({
        name: 'Tango',
        image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dotabuff.com%2Fplayers%2F185169023&psig=AOvVaw25Z2z9j4-J_MCNG3gGVVdJ&ust=1607587502505000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKiaxKS4wO0CFQAAAAAdAAAAABAD',
        price: 90000,
        stock: 'aosdkoa'
      })
      .then(response => {
        let { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('error', 'Stock must be a number')
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})

describe('GET /products', () => {
  it('success get product', done => {
    request(app)
      .get('/products')
      .set('access_token', access_token)
      .then(response => {
        let { body, status } = response
        expect(status).toBe(200)
        expect(body.length).toEqual(1)
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('fail get product', done => {
    request(app)
      .get('/products')
      .set('access_token', '')
      .then(response => {
        let { body, status } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty('error', 'Authentication failed')
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})

describe('PUT /products', () => {
  it('update product success', (done) => {
    request(app)
      .put(`/products/${id}`)
      .set('access_token', access_token)
      .send({
        name: 'Healing Salve',
        image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F85216617930400312%2F&psig=AOvVaw11PxRsCkvDEyKDY0puyaW7&ust=1607592121976000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLilhcXJwO0CFQAAAAAdAAAAABAI',
        price: 110000,
        stock: 50
      })
      .then(response => {
        let { body, status } = response
        expect(status).toBe(200)
        expect(body).toHaveProperty('id', expect.any(Number))
        expect(body).toHaveProperty('name', 'Healing Salve')
        expect(body).toHaveProperty('image_url', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F85216617930400312%2F&psig=AOvVaw11PxRsCkvDEyKDY0puyaW7&ust=1607592121976000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLilhcXJwO0CFQAAAAAdAAAAABAI')
        expect(body).toHaveProperty('price', 110000)
        expect(body).toHaveProperty('stock', 50)
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('without access_token, update product fail', (done) => {
    request(app)
      .put(`/products/${id}`)
      .set('access_token', '')
      .send({
        name: 'Healing Salve',
        image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F85216617930400312%2F&psig=AOvVaw11PxRsCkvDEyKDY0puyaW7&ust=1607592121976000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLilhcXJwO0CFQAAAAAdAAAAABAI',
        price: 110000,
        stock: 50
      })
      .then(response => {
        let { body, status } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty('error', 'Authentication failed')
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('not admin, update product fail', (done) => {
    request(app)
      .put(`/products/${id}`)
      .set('access_token', cust_token)
      .send({
        name: 'Healing Salve',
        image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F85216617930400312%2F&psig=AOvVaw11PxRsCkvDEyKDY0puyaW7&ust=1607592121976000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLilhcXJwO0CFQAAAAAdAAAAABAI',
        price: 110000,
        stock: 50
      })
      .then(response => {
        let { body, status } = response
        expect(status).toBe(403)
        expect(body).toHaveProperty('error', 'Not Authorized')
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('minus stock, update product fail', (done) => {
    request(app)
      .put(`/products/${id}`)
      .set('access_token', access_token)
      .send({
        name: 'Healing Salve',
        image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F85216617930400312%2F&psig=AOvVaw11PxRsCkvDEyKDY0puyaW7&ust=1607592121976000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLilhcXJwO0CFQAAAAAdAAAAABAI',
        price: 110000,
        stock: -50
      })
      .then(response => {
        let { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('error', 'Stock cant be minus')
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('minus price, update product fail', (done) => {
    request(app)
      .put(`/products/${id}`)
      .set('access_token', access_token)
      .send({
        name: 'Healing Salve',
        image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F85216617930400312%2F&psig=AOvVaw11PxRsCkvDEyKDY0puyaW7&ust=1607592121976000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLilhcXJwO0CFQAAAAAdAAAAABAI',
        price: -110000,
        stock: 50
      })
      .then(response => {
        let { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('error', 'Price cant be minus')
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('stock not a number, update product fail', (done) => {
    request(app)
      .put(`/products/${id}`)
      .set('access_token', access_token)
      .send({
        name: 'Healing Salve',
        image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F85216617930400312%2F&psig=AOvVaw11PxRsCkvDEyKDY0puyaW7&ust=1607592121976000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLilhcXJwO0CFQAAAAAdAAAAABAI',
        price: 110000,
        stock: 'fifty'
      })
      .then(response => {
        let { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('error', 'Stock must be a number')
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('price not a number, update product fail', (done) => {
    request(app)
      .put(`/products/${id}`)
      .set('access_token', access_token)
      .send({
        name: 'Healing Salve',
        image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F85216617930400312%2F&psig=AOvVaw11PxRsCkvDEyKDY0puyaW7&ust=1607592121976000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLilhcXJwO0CFQAAAAAdAAAAABAI',
        price: 'one hundred and ten thousand',
        stock: 50
      })
      .then(response => {
        let { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('error', 'Price must be a number')
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})

describe('DELETE /products', () => {
  it('delete product success', done => {
    request(app)
      .delete(`/products/${id}`)
      .set('access_token', access_token)
      .then(response => {
        let { body, status } = response
        expect(status).toBe(200)
        expect(body).toHaveProperty('msg', 'Delete product success')
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('without access_token, delete product fail', done => {
    request(app)
      .delete(`/products/${id}`)
      .set('access_token', '')
      .then(response => {
        let { body, status } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty('error', 'Authentication failed')
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('not admin, delete product fail', done => {
    request(app)
      .delete(`/products/${id}`)
      .set('access_token', cust_token)
      .then(response => {
        let { body, status } = response
        expect(status).toBe(403)
        expect(body).toHaveProperty('error', 'Not Authorized')
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})