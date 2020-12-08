const app = require('../app.js')
const request = require('supertest')
const { generateToken } = require('../helpers/token')

const id = 27
let access_token = ''
let user_access_token = ''

beforeAll((done) => {
  access_token = generateToken({id: 1, email: 'admin@mail.com'})
  user_access_token = generateToken({id: 2, email: 'user@mail.com'})
  done()
})


describe('Create product test for E-Commerce CMS', () => {
  describe('Success creating product', () => {
    it('Should return 201 and JSON: name, image_url, price, stock', (done) => {
      let input = {
        name: 'Mouse Gaming',
        image_url: 'gambar_mouse_gaming.img',
        price: 50000,
        stock: 5
      }
      request(app)
        .post('/products')
        .set('access_token', access_token)
        .send(input)
        .then(response => {
          let { body, status } = response;
          expect(status).toBe(201);
          expect(body).toHaveProperty('name', input.name);
          expect(body).toHaveProperty('image_url', input.image_url);
          expect(body).toHaveProperty('price', input.price);
          expect(body).toHaveProperty('stock', input.stock);
          done();
        })
        .catch(err => {
          done(err)
        })
    })
  });
  describe('Error to create product with no access token', () => {
    it('Should return 401 and message error', done => {
      let input = {
        name: 'Mouse Gaming',
        image_url: 'gambar_mouse_gaming.img',
        price: 50000,
        stock: 5
      }
      request(app)
      .post('/products')
      .set('access_token', '')
      .send(input)
      .then(response => {
        let { body, status } = response;
        expect(status).toBe(401);
        expect(body).toEqual(
          expect.stringContaining("You have to login first")
          );
        done();
      })
      .catch(err => {
        done(err)
      })
    })
  }),
  describe('Error to create product with User role account', () => {
    it('Should return 403 and message error', done => {
      let input = {
        name: 'Mouse Gaming',
        image_url: 'gambar_mouse_gaming.img',
        price: 50000,
        stock: 5
      }
      request(app)
      .post('/products')
      .set('access_token', user_access_token)
      .send(input)
      .then(response => {
        let { body, status } = response;
        expect(status).toBe(403);
        expect(body).toEqual(
          expect.stringContaining("User not Authenticated")
          );
        done();
      })
      .catch(err => {
        done(err)
      })
    })
  });
  describe('Error to create product with no field filled', () => {
    it('Should return 400 and message error', done => {
      let input = {
        name: '',
        image_url: '',
        price: '',
        stock: ''
      }
      let output = "Name cannot be empty, Price cannot be empty, Price must be a number, Stock cannot be empty, Stock must be a number"
      request(app)
      .post('/products')
      .set('access_token', access_token)
      .send(input)
      .then(response => {
        let { body, status } = response;
        expect(status).toBe(400);
        expect(body).toEqual(
          expect.stringContaining(output)
          );
        done();
      })
      .catch(err => {
        done(err);
      })
    })
  });
  describe('Error to create product with negative stock and price input', () => {
    it('Should return message error "Stock must be greater than 0" and "Price must be greater than 0"', done => {
      let input = {
        name: 'Mouse Gaming',
        image_url: 'gambar_mouse_gaming.img',
        price: -10000,
        stock: -5
      }
      let output = "Price must be greater than 0, Stock must be greater than 0"
      request(app)
      .post('/products')
      .set('access_token', access_token)
      .send(input)
      .then(response => {
        let { body, status } = response;
        expect(status).toBe(400);
        expect(body).toEqual(
          expect.stringContaining(output)
          );
        done();
      })
      .catch(err => {
        done(err);
      })
    })
  })
})

describe('Read product test for E-Commerce CMS', () => {
  describe('Success updating product', () => {
    it('Should return 200 and JSON: name, image_url, price, stock', (done) => {
      request(app)
        .get('/products')
        .then(response => {
          let { body, status } = response;
          expect(status).toBe(200);
          expect(Array.isArray(['body'])).toBe(true);
          expect(body[0]).toHaveProperty('name');
          expect(body[0]).toHaveProperty('image_url');
          expect(body[0]).toHaveProperty('price');
          expect(body[0]).toHaveProperty('stock');
          expect(body[0]).toHaveProperty('createdAt');
          expect(body[0]).toHaveProperty('updatedAt');
          done();
        })
        .catch(err => {
          done(err)
        })
    })
  });
})

describe('Update product test for E-Commerce CMS', () => {
  describe('Success updating product', () => {
    it('Should return 200 and JSON: name, image_url, price, stock', (done) => {
      let input = {
        name: 'Keyboard Gaming',
        image_url: 'gambar_keyboard_gaming.img',
        price: 1000000,
        stock: 10
      }
      request(app)
        .put('/products/' + id)
        .set('access_token', access_token)
        .send(input)
        .then(response => {
          let { body, status } = response;
          expect(status).toBe(200);
          expect(body).toHaveProperty('name', input.name);
          expect(body).toHaveProperty('image_url', input.image_url);
          expect(body).toHaveProperty('price', input.price);
          expect(body).toHaveProperty('stock', input.stock);
          done();
        })
        .catch(err => {
          done(err)
        })
    })
  });
  describe('Error to update product with no access token', () => {
    it('Should return 401 and message error', done => {
      let input = {
        name: 'Keyboard Gaming',
        image_url: 'gambar_keyboard_gaming.img',
        price: 1000000,
        stock: 10
      }
      request(app)
        .put('/products/' + id)
        .set('access_token', '')
        .send(input)
        .then(response => {
          let { body, status } = response;
          expect(status).toBe(401);
          expect(body).toEqual(
            expect.stringContaining("You have to login first")
            );
          done();
        })
        .catch(err => {
          done(err)
        })
    })
  });
  describe('Error to update product with User role account', () => {
    it('Should return 403 and message error', done => {
      let input = {
        name: 'Keyboard Gaming',
        image_url: 'gambar_keyboard_gaming.img',
        price: 1000000,
        stock: 10
      }
      request(app)
        .put('/products/' + id)
        .set('access_token', user_access_token)
        .send(input)
        .then(response => {
          let { body, status } = response;
          expect(status).toBe(403);
          expect(body).toEqual(
            expect.stringContaining("User not Authenticated")
            );
          done();
        })
        .catch(err => {
          done(err)
        })
    })
  });
  describe('Error to update product with negative stock', () => {
    it('Should return 400 and message error', done => {
      let input = {
        name: 'Keyboard Gaming',
        image_url: 'gambar_keyboard_gaming.img',
        price: 1000000,
        stock: -5
      }
      request(app)
        .put('/products/' + id)
        .set('access_token', access_token)
        .send(input)
        .then(response => {
          let { body, status } = response;
          expect(status).toBe(400);
          expect(body).toEqual(
            expect.stringContaining("Stock must be greater than 0")
            );
          done();
        })
        .catch(err => {
          done(err)
        })
    })
  });
  describe('Error to update product with invalid data type', () => {
    it('Should return 400 and message error', done => {
      let input = {
        name: "Keyboard Gaming",
        image_url: 'gambar_keyboard_gaming.img',
        price: "sepuluh",
        stock: "lima"
      }
      request(app)
        .put('/products/' + id)
        .set('access_token', access_token)
        .send(input)
        .then(response => {
          let { body, status } = response;
          expect(status).toBe(400);
          expect(body).toEqual(
            expect.stringContaining("Price must be a number, Stock must be a number")
            );
          done();
        })
        .catch(err => {
          done(err)
        })
    })
  });
  describe('Error to update product with negative price', () => {
    it('Should return 400 and message error', done => {
      let input = {
        name: 'Keyboard Gaming',
        image_url: 'gambar_keyboard_gaming.img',
        price: -1000000,
        stock: 5
      }
      request(app)
        .put('/products/' + id)
        .set('access_token', access_token)
        .send(input)
        .then(response => {
          let { body, status } = response;
          expect(status).toBe(400);
          expect(body).toEqual(
            expect.stringContaining("Price must be greater than 0")
            );
          done();
        })
        .catch(err => {
          done(err)
        })
    })
  });
})

describe('Delete product test for E-Commerce CMS', () => {
  describe('Success deleting product', () => {
    it('Should return 200 and message success', (done) => {
      request(app)
        .delete('/products/' + id)
        .set('access_token', access_token)
        .then(response => {
          let { body, status } = response;
          expect(status).toBe(200);
          expect(body).toEqual(
            expect.stringContaining("Successfully deleted product")
            );
          done();
        })
        .catch(err => {
          done(err)
        })
    })
  });
  describe('Error to delete product with no access token', () => {
    it('Should return 401 and message error', done => {
      request(app)
        .delete('/products/' + id)
        .set('access_token', '')
        .then(response => {
          let { body, status } = response;
          expect(status).toBe(401);
          expect(body).toEqual(
            expect.stringContaining("You have to login first")
            );
          done();
        })
        .catch(err => {
          done(err)
        })
    })
  });
  describe('Error to update product with User role account', () => {
    it('Should return 403 and message error', done => {
      request(app)
        .put('/products/' + id)
        .set('access_token', user_access_token)
        .then(response => {
          let { body, status } = response;
          expect(status).toBe(403);
          expect(body).toEqual(
            expect.stringContaining("User not Authenticated")
            );
          done();
        })
        .catch(err => {
          done(err)
        })
    })
  });
})