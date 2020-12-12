const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { hash } = require("../helpers/bcrypt-helper");

beforeAll((done) => {
  queryInterface
    .bulkInsert(
      "Users",
      [
        {
          email: "admin@user.com",
          password: hash("admin"),
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "johncena@wwe.com",
          password: hash("johncena"),
          role: "customer",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    )
    .then((response) => {
      console.log(response);
      done();
    })
    .catch((err) => {
      console.log(err);
      done(err);
    });
});

afterAll((done) => {
  queryInterface
    .bulkDelete("Users")
    .then((response) => {
      console.log(response);
      done();
    })
    .catch((err) => {
      console.log(err);
      done(err);
    });
});

describe("Login User POST /users/login", () => {
  describe(
    "success login",
    () => {
      test("should response with access_token", (done) => {
        request(app)
          .post("/users/login")
          .send({ email: "admin@user.com", password: "admin" })
          .end((err, res) => {
            const { body, status } = res;
            if (err) {
              return done(err);
            }
            expect(status).toBe(200);
            expect(body).toHaveProperty("access_token", expect.any(String));
            done();
          });
      });
    },
    describe("failed login", () => {
      test("email true, password false", (done) => {
        request(app)
          .post("/users/login")
          .send({ email: "admin@user.com", password: "wrongpass" })
          .end((err, res) => {
            const { body, status } = res;
            if (err) {
              return done(err);
            }
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Invalid email/password");
            done();
          });
      });
      test("email true, password empty", (done) => {
        request(app)
          .post("/users/login")
          .send({ email: "admin@user.com", password: "" })
          .end((err, res) => {
            const { body, status } = res;
            if (err) {
              return done(err);
            }
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Invalid email/password");
            done();
          });
      });
      test("email empty, password empty", (done) => {
        request(app)
          .post("/users/login")
          .send({ email: "", password: "" })
          .end((err, res) => {
            const { body, status } = res;
            if (err) {
              return done(err);
            }
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Invalid Account");
            done();
          });
      });
    })
  );
});
