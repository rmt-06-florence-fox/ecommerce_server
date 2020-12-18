const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { hash } = require("../helpers/passwordHandler");

let username;
let email;
const password = "adminganteng";
const emailSalah = "adminku@admin.com";
const passwordSalah = "adminadmin";

beforeAll(async (done) => {
  const admin = [
    {
      username: "admin",
      role: "admin",
      email: "admin@admin.com",
      password: hash(password),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  try {
    const data = await queryInterface.bulkInsert("Users", admin, {
      returning: true,
    });
    username = data[0].username;
    email = data[0].email;
    done()
  } catch (error) {
    done(error);
  }
});

afterAll(async (done) => {
  try {
    await queryInterface.bulkDelete("Users");
    done();
  } catch (error) {
    done(error);
  }
});

//admin
describe("POST /admin/login", () => {
  //login success
  test("TEST CASE 1: LOGIN SUCCESS", (done) => {
    request(app)
      .post("/admin/login")
      .send({ email, password })
      .end(function (err, res) {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(200);
        expect(body).toHaveProperty("access_token", expect.any(String));
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("username", username);
        expect(body).toHaveProperty("email", email);
        done();
      });
  });

  // EMAIL EXISTS BUT WRONG PASSWORD (401)
  test("TEST CASE 2: EMAIL EXISTS BUT WRONG PASSWORD", (done) => {
    request(app)
      .post("/admin/login")
      .send({ email, password: passwordSalah })
      .end(function (err, res) {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Wrong email/password");
        done();
      });
  });

  // EMAIL NOT EXISTS (404)
  test("TEST CASE 3: EMAIL NOT EXISTS", (done) => {
    request(app)
      .post("/admin/login")
      .send({ email: emailSalah, password })
      .end(function (err, res) {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Account not found!");
        done();
      });
  });
  // NOT ENTERED EMAIL AND PASSWORD (500)
  test("TEST CASE 4: EMAIL NOT EXISTS", (done) => {
    request(app)
      .post("/admin/login")
      .end(function (err, res) {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(500);
        expect(body).toHaveProperty("message", "Internal server error");
        done();
      });
  });
});
