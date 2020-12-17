const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models/index')
const { queryInterface } = sequelize
const { User } = require('../models/index')
const Jwt = require('../helpers/jwt')

let adminToken;
let customerToken;
let number;

afterAll(done => {
  queryInterface.bulkDelete('Products')
    .then(() => {
      done();
    })
    .catch(err => {
      done();
    })
})

afterAll(done => {
  queryInterface.bulkDelete('Users')
    .then(() => {
      done();
    })
    .catch(err => {
      done();
    })
})

beforeAll(done => {
  User.create({
    firstName: 'bima.',
    lastName: 'krishna',
    gender: 'male',
    email: 'admin@mail.com',
    password: '1234',
    role: 'admin'
  })
    .then(admin => {
      adminToken = Jwt.sign({
        id: admin.id, firstName: admin.firstName, lastName: admin.lastName, gender: admin.gender, email: admin.email, role: admin.role
      })
      return User.create({
        firstName: 'budi.',
        lastName: 'sudarsono',
        gender: 'male',
        email: 'budi@mail.com',
        password: '1234',
        role: 'customer'
      })
    })
    .then(customer => {
      customerToken = Jwt.sign({
        id: customer.id, firstName: customer.firstName, lastName: customer.lastName, gender: customer.gender, email: customer.email, role: customer.role 
      })
      done();
    })
    .catch(err => {
      done(err);
    })
})

describe('Test Endpoint POST /products', () => {
    // Success add product
    it('Test add new one product success', done => {
      request(app)
        .post('/products')
        .set('token', adminToken)
        .send({ name: "Macbook Pro 2020", image_url: "https://images.unsplash.com/photo-1504691342899-4d92b50853e1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80", price: 25000000, stock: 3, CategoryId: 1 })
        .then(response => {
          const { body, status } = response;
  
          expect(status).toEqual(201);
          expect(body).toHaveProperty("id", expect.any(Number));
          expect(body).toHaveProperty("name", "Macbook Pro 2020");
          expect(body).toHaveProperty("image_url", "https://images.unsplash.com/photo-1504691342899-4d92b50853e1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80");
          expect(body).toHaveProperty("price", 25000000);
          expect(body).toHaveProperty("stock", 3);
          expect(body).toHaveProperty("CategoryId", 1);
          number = +body.id;
          done();
        })
        .catch(err => {
          done(err);
        })
    })
  
    // Cannot add product as a customer
    it('Test can not add product as a customer', done => {
      request(app)
        .post('/products')
        .set('token', customerToken)
        .send({ name: "Macbook Pro 2020", image_url: "https://images.unsplash.com/photo-1504691342899-4d92b50853e1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80", price: 25000000, stock: 3, CategoryId: 1 })
        .then(response => {
          const { body, status } = response;
  
          expect(status).toEqual(401);
          expect(body).toHaveProperty("message", "You are out of authority");
  
          done();
        })
        .catch(err => {
          done(err);
        })
    })
  
    // Cannot add product with name property has an empty value
    it('Test can not add product because empty name value', done => {
      request(app)
        .post('/products')
        .set('token', adminToken)
        .send({ name: "", image_url: "https://images.unsplash.com/photo-1504691342899-4d92b50853e1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80", price: 25000000, stock: 3, CategoryId: 1 })
        .then(response => {
          const { body, status } = response;
  
          expect(status).toEqual(400);
          expect(body).toHaveProperty("message", "Product name can not be empty");
  
          done();
        })
        .catch(err => {
          done(err);
        })
    })
  
    // Cannot add product with image_url property has an empty value
    it('Test cannot add product because empty image_url value', done => {
      request(app)
        .post('/products')
        .set('token', adminToken)
        .send({ name: "Macbook Pro 2020", image_url: "", price: 25000000, stock: 3 })
        .then(response => {
          const { body, status } = response;
  
          expect(status).toEqual(400);
          expect(body).toHaveProperty("message", "image_url can not be empty");
  
          done();
        })
        .catch(err => {
          done(err);
        })
    })
  
    // Cannot add product with price property has an empty value
    it('Test cannot add product because empty price value', done => {
      request(app)
        .post('/products')
        .set('token', adminToken)
        .send({ name: "Macbook Pro 2020", image_url: "https://images.unsplash.com/photo-1504691342899-4d92b50853e1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80", price: '', stock: 3, CategoryId: 1 })
        .then(response => {
          const { body, status } = response;
  
          expect(status).toEqual(400);
          expect(body).toHaveProperty("message", "price can not be empty");
  
          done();
        })
        .catch(err => {
          done(err);
        })
    })
  
    // Cannot add product with stock property has an empty value
    it('Test cannot add product because empty stock value', done => {
      request(app)
        .post('/products')
        .set('token', adminToken)
        .send({ name: "Macbook Pro 2020", image_url: "https://images.unsplash.com/photo-1504691342899-4d92b50853e1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80", price: 25000000, stock: '', CategoryId: 1 })
        .then(response => {
          const { body, status } = response;
  
          expect(status).toEqual(400);
          expect(body).toHaveProperty("message", "stock can not be empty");
  
          done();
        })
        .catch(err => {
          done(err);
        })
    })
  
    // Cannot add product with CategoryId property has an empty value
    it('Test cannot add product because empty CategoryId value', done => {
      request(app)
        .post('/products')
        .set('token', adminToken)
        .send({ name: "Macbook Pro 2020", image_url: "https://images.unsplash.com/photo-1504691342899-4d92b50853e1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80", price: 25000000, stock: 3, CategoryId: '' })
        .then(response => {
          const { body, status } = response;
  
          expect(status).toEqual(400);
          expect(body).toHaveProperty("message", "please choose product category");
  
          done();
        })
        .catch(err => {
          done(err);
        })
    })
  
    // Cannot add product with price lower than 0
    it('Test cannot add product with price lower than 0', done => {
      request(app)
        .post('/products')
        .set('token', adminToken)
        .send({ name: "Macbook Pro 2020", image_url: "https://images.unsplash.com/photo-1504691342899-4d92b50853e1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80", price: -15000000, stock: 3, CategoryId: 1 })
        .then(response => {
          const { body, status } = response;
  
          expect(status).toEqual(400);
          expect(body).toHaveProperty("message", "Price must be higher than 0");
  
          done();
        })
        .catch(err => {
          done(err);
        })
    })
  
    // Cannot add product with stock lower than 0
    it('Test cannot add product with price lower than 0', done => {
      request(app)
        .post('/products')
        .set('token', adminToken)
        .send({ name: "Macbook Pro 2020", image_url: "https://images.unsplash.com/photo-1504691342899-4d92b50853e1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80", price: 25000000, stock: -3, CategoryId: 1 })
        .then(response => {
          const { body, status } = response;
  
          expect(status).toEqual(400);
          expect(body).toHaveProperty("message", "Stock must be higher than 0");
  
          done();
        })
        .catch(err => {
          done(err);
        })
    })
  })
  
  describe('Test Endpoint GET /products', () => {
    // Success get all products
    it('Test get all products sukses', done => {
      request(app)
        .get('/products')
        .then(response => {
          const { body, status } = response;
  
          expect(status).toEqual(200);
          expect(body[0]).toHaveProperty("name", expect.anything());
          expect(body[0]).toHaveProperty("image_url", expect.anything());
          expect(body[0]).toHaveProperty("price", expect.any(Number));
          expect(body[0]).toHaveProperty("stock", expect.any(Number));
          expect(body[0]).toHaveProperty("CategoryId", expect.any(Number));
          done();
        })
        .catch(err => {
          done(err);
        })
    })
  })
  
  describe('Test Endpoint PUT /products/:id', () => {
    // Success edit product
    it('Test edit product sukses', done => {
      request(app)
        .put(`/products/${number}`)
        .set('token', adminToken)
        .send({ name: "Ipad Pro 2020", image_url: "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2748&q=80", price: 21000000, stock: 5, CategoryId: 1 })
        .then(response => {
          const { body, status } = response;
  
          expect(status).toEqual(200);
          expect(body[0]).toHaveProperty("id", expect.any(Number));
          expect(body[0]).toHaveProperty("name", "Ipad Pro 2020");
          expect(body[0]).toHaveProperty("image_url", "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2748&q=80");
          expect(body[0]).toHaveProperty("price", 21000000);
          expect(body[0]).toHaveProperty("stock", 5);
          expect(body[0]).toHaveProperty("CategoryId", 1);
          done();
        })
        .catch(err => {
          done(err);
        })
    })
  
    // Cannot edit product as a customer
    it('Test cannot edit product as a customer', done => {
      request(app)
        .put(`/products/${number}`)
        .set('token', customerToken)
        .send({ name: "IPad Pro 2020", image_url: "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2748&q=80", price: 21000000, stock: 3, CategoryId: 1 })
        .then(response => {
          const { body, status } = response;
  
          expect(status).toEqual(401);
          expect(body).toHaveProperty("message", "You are out of authority");
  
          done();
        })
        .catch(err => {
          done(err);
        })
    })
  
    // Cannot edit product with name property has an empty value
    it('Test cannot edit product because empty name value', done => {
      request(app)
        .put(`/products/${number}`)
        .set('token', adminToken)
        .send({ name: "", image_url: "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2748&q=80", price: 21000000, stock: 3, CategoryId: 1 })
        .then(response => {
          const { body, status } = response;
  
          expect(status).toEqual(400);
          expect(body).toHaveProperty("message", "Product name can not be empty");
  
          done();
        })
        .catch(err => {
          done(err);
        })
    })
  
    // Cannot edit product with image_url property has an empty value
    it('Test cannot edit product because empty image_url value', done => {
      request(app)
        .put(`/products/${number}`)
        .set('token', adminToken)
        .send({ name: "IPad Pro 2020", image_url: "", price: 21000000, stock: 3 })
        .then(response => {
          const { body, status } = response;
  
          expect(status).toEqual(400);
          expect(body).toHaveProperty("message", "image_url can not be empty");
  
          done();
        })
        .catch(err => {
          done(err);
        })
    })
  
    // Cannot edit product with price property has an empty value
    it('Test cannot edit product bacause empty price value', done => {
      request(app)
        .put(`/products/${number}`)
        .set('token', adminToken)
        .send({ name: "IPad Pro 2020", image_url: "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2748&q=80", price: '', stock: 3, CategoryId: 1 })
        .then(response => {
          const { body, status } = response;
  
          expect(status).toEqual(400);
          expect(body).toHaveProperty("message", "price can not be empty");
  
          done();
        })
        .catch(err => {
          done(err);
        })
    })
  
    // Cannot edit product with stock property has an empty value
    it('Test cannot edit product because empty product value', done => {
      request(app)
        .put(`/products/${number}`)
        .set('token', adminToken)
        .send({ name: "IPad Pro 2020", image_url: "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2748&q=80", price: 21000000, stock: '', CategoryId: 1 })
        .then(response => {
          const { body, status } = response;
  
          expect(status).toEqual(400);
          expect(body).toHaveProperty("message", "stock can not be empty");
  
          done();
        })
        .catch(err => {
          done(err);
        })
    })
  
    // Cannot add product with CategoryId property has an empty value
    it('Test cannot add product because empty CategoryId value', done => {
      request(app)
        .put(`/products/${number}`)
        .set('token', adminToken)
        .send({ name: "IPad Pro 2020", image_url: "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2748&q=80", price: 21000000, stock: 3, CategoryId: '' })
        .then(response => {
          const { body, status } = response;
  
          expect(status).toEqual(400);
          expect(body).toHaveProperty("message", "please choose product category");
  
          done();
        })
        .catch(err => {
          done(err);
        })
    })
  
    // Cannot edit product with price lower than 0
    it('Test cannot edit product with price lower than 0', done => {
      request(app)
        .put(`/products/${number}`)
        .set('token', adminToken)
        .send({ name: "IPad Pro 2020", image_url: "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2748&q=80", price: -15000000, stock: 3, CategoryId: 1 })
        .then(response => {
          const { body, status } = response;
  
          expect(status).toEqual(400);
          expect(body).toHaveProperty("message", "Price must be higher than 0");
  
          done();
        })
        .catch(err => {
          done(err);
        })
    })
  
    // Cannot edit product with stock lower than 0
    it('Test cannot edit product with price lower than 0', done => {
      request(app)
        .put(`/products/${number}`)
        .set('token', adminToken)
        .send({ name: "IPad Pro 2020", image_url: "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2748&q=80", price: 15000000, stock: -3, CategoryId: 1 })
        .then(response => {
          const { body, status } = response;
  
          expect(status).toEqual(400);
          expect(body).toHaveProperty("message", "Stock must be higher than 0");
  
          done();
        })
        .catch(err => {
          done(err);
        })
    })
  })
  
  describe('Test Endpoint DELETE /products/:id', () => {
    // Success delete product
    it('Test delete product sukses', done => {
      request(app)
        .delete(`/products/${number}`)
        .set('token', adminToken)
        .then(response => {
          const { body, status } = response;
          
          expect(status).toEqual(200);
          expect(body).toHaveProperty("message", "deleted success");
          done();
        })
        .catch(err => {
          done(err);
        })
    })
  
    // Cannot edit product as a customer
    it('Test can not delete product as a customer', done => {
      console.log(customerToken);
      request(app)
        .delete(`/products/${number}`)
        .set('token', customerToken)
        .then(response => {
          const { body, status } = response;
          expect(status).toEqual(401);
          expect(body).toHaveProperty("message", "You are out of authority");
          done();
        })
        .catch(err => {
          done(err);
        })
    })
  })