const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

// afterAll(async (done) => {
//   try {
//     await queryInterface.bulkDelete("Users");
//     done();
//   } catch (error) {
//     done(error);
//   }
// });

const username = 'admin';
const email = 'admin@admin.com';
const password = 'adminganteng';

//admin
describe('POST /login', () => {
  //login success
  test('TEST CASE 1: LOGIN SUCCESS', (done) => {
    request(app)
    .post('/admin/login')
    .send({ email, password })
    .end(function(err, res) {
      console.log(res)
      if (err) return done(err);
      const { status, body } = res
      expect(status).toBe(200)
      expect(body).toHaveProperty("access_token", expect.any(String));
      expect(body).toHaveProperty("id", expect.any(Number));
      expect(body).toHaveProperty("username", username);
      expect(body).toHaveProperty("email", email);
      done()    
    })
  });
  
});
