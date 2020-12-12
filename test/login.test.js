const app = require('../app.js')
const request = require('supertest')
const { generateToken } = require('../helpers/token')

describe('Login test for User', () => {
  describe('Success to login and received token', () => {
    it('Should return 200 and access token', (done) => {
      let input = {
        email: 'admin@mail.com',
        password: '123456'
      }
      request(app)
        .post('/admin/login')
        .send(input)
        .then(response => {
          let { body, status } = response;
          expect(status).toBe(200);
          expect(body).toHaveProperty('access_token');
          expect(typeof body.access_token).toBe('string');
          done();
        })
        .catch(err => {
          done(err)
        })
    })
  });
  describe('Error to login with wrong password', () => {
    it('Should return 400 and message error', (done) => {
      let input = {
        email: 'admin@mail.com',
        password: 'admin'
      }
      request(app)
        .post('/admin/login')
        .send(input)
        .then(response => {
          let { body,status } = response;
          expect(status).toBe(400);
          expect(body).toBe('Email or password is incorrect')
          done();
        })
        .catch(err => {
          done(err);
        })
    })
  });
  describe('Error to login with no account in database', () => {
    it('Should return 400 and message error', (done) => {
      let input = {
        email: 'coba@mail.com',
        password: 'admin'
      }
      request(app)
        .post('/admin/login')
        .send(input)
        .then(response => {
          let { body,status } = response;
          expect(status).toBe(400);
          expect(body).toBe('Email or password is incorrect')
          done();
        })
        .catch(err => {
          done(err);
        })
    })
  });
  describe('Error to login using an account with user role in database', () => {
    it('Should return 400 and message error', (done) => {
      let input = {
        email: 'coba@mail.com',
        password: 'admin'
      }
      request(app)
        .post('/admin/login')
        .send(input)
        .then(response => {
          let { body,status } = response;
          expect(status).toBe(400);
          expect(body).toBe('Email or password is incorrect')
          done();
        })
        .catch(err => {
          done(err);
        })
    })
  })
})
