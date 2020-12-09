const request = require("supertest");
const app = require("../app");
const { hash } = require("../helpers/bcrypt");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

beforeAll(async (done) => {
  try {
    const user = await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "admin@mail.com",
          password: hash("123456", 10),
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    done();
  } catch (error) {
    done(error);
  }
});

afterAll(async (done) => {
  await queryInterface.bulkDelete("Users", null, {});
  done();
});

//Success test cases
describe("Login User POST /login", () => {
  describe("Success Login", () => {
    test("Response with access token", (done) => {
      request(app)
        .post("/login")
        .send({
          email: "admin@mail.com",
          password: "123456",
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          }
          expect(status).toBe(200);
          expect(body).toHaveProperty("access_token");
          done();
        });
    });
  });

  //Failed test cases
  describe("Error Login with Wrong Password", () => {
    test("Invalid email / password", (done) => {
      request(app)
        .post("/login")
        .send({
          email: "admin@mail.com",
          password: "12345",
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          }
          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Invalid username/password");
          done();
        });
    });
  });
  describe("Error Login with Email Not Found", () => {
    test("Invalid Account ", (done) => {
      request(app)
        .post("/login")
        .send({
          email: "admindummy@mail.com",
          password: "123456",
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          }
          expect(status).toBe(404);
          expect(body).toHaveProperty("message", "Invalid account");
          done();
        });
    });
  });
  describe("Error Login with empty input", () => {
    test("empty input", (done) => {
      request(app)
        .post("/login")
        .send({
          email: "",
          password: "",
        })
        .end((err, res) => {
          const { body, status } = res;
          if (err) {
            return done(err);
          }
          expect(status).toBe(404);
          expect(body).toHaveProperty("message", "Invalid account");
          done();
        });
    });
  });
});
