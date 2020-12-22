const request = require("supertest");
const app = require("../app");
const { hash } = require("../helpers/bcrypt");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

beforeAll((done) => {
  queryInterface.bulkInsert("Users", [
    {
      first_name: "John",
      last_name: "Doe",
      email: "admin@mail.com",
      password: hash("123456"),
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      first_name: "Jane",
      last_name: "Doe",
      email: "janedoe@mail.com",
      password: hash("123456"),
      role: "customer",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], { returning: true })
  .then(user => {
      done();
  })
  .catch((err) => {
    done(err);
  })
});

afterAll((done) => {
  queryInterface.bulkDelete("Users")
    .then((response) => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("User login POST /admin/login", () => {
  describe("success, User logged in", () => {
    test("response with access_token", (done) => {
      request(app)
      .post("/admin/login")
      .send({ email: "admin@mail.com", password: "123456" })
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(200);
        expect(body).toHaveProperty("access_token", expect.any(String));
        expect(body).toHaveProperty("fullName", "John Doe");
        done();
      });
    });
  });
  describe("error, login ", () => {
    test("cannot log User in, password is wrong", (done) => {
      request(app)
      .post("/admin/login")
      .send({email: "admin@mail.com", password: "1234"})
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Email or password is invalid.");
        done();
      });
    });
  });
    test("cannot log User in, email is not in database", (done) => {
      request(app)
      .post("/admin/login")
      .send({email: "admin2@mai.com", password: "123456"})
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Email or password is invalid.");
        done();
      });
    });
    test("cannot log User in, no password is provided", (done) => {
      request(app)
      .post("/admin/login")
      .send({email: "admin@mail.com", password: ""})
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Email or password is invalid.");
        done();
      });
    });
});