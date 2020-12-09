const request = require("supertest");
const app = require("../app");
const { hash } = require("../helpers/bcrypt");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { sign } = require("../helpers/jwt");

let adminToken = "";
let customerToken = "";
let ProductId = 0;
let CategoryId = 0;

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
  .then((user) => {
      adminToken = sign(user[0].id, user[0].email, user[0].role);    
      customerToken = sign(user[1].id, user[1].email, user[1].role);
      return queryInterface.bulkInsert("Categories", [
        {
          name: "movie",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], { returning: true })
  })
  .then((category) => {
      CategoryId = category[0].id;
      done();
  })
  .catch((err) => {
    done(err);
  })
});

afterAll((done) => {
  queryInterface.bulkDelete("Products")
    .then((response) => {
      return queryInterface.bulkDelete("Users")
    })
    .then((response) => {
      return queryInterface.bulkDelete("Categories")
    })
    .then((response) => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});


/* --------------------------------------CREATE-------------------------------------- */

describe("create Product POST /products", () => {
  describe("success, Product created", () => {
    test("create Product using body property", (done) => {
      request(app)
      .post("/products")
      .set("access_token", adminToken)
      .send({ 
        name: "Alita",
        CategoryId: CategoryId,
        image_url: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ee/Alita_Battle_Angel_%282019_poster%29.png/220px-Alita_Battle_Angel_%282019_poster%29.png",
        price: 200000,
        stock:  20
      })
      .end((err, res) => {
        const { body, status } = res;
        ProductId = body.id;
        if (err) {
          return done(err);
        }
        expect(status).toBe(201);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("name", "Alita");
        expect(body).toHaveProperty("CategoryId", CategoryId);
        expect(body).toHaveProperty("image_url", "https://upload.wikimedia.org/wikipedia/en/thumb/e/ee/Alita_Battle_Angel_%282019_poster%29.png/220px-Alita_Battle_Angel_%282019_poster%29.png");
        expect(body).toHaveProperty("price", 200000);
        expect(body).toHaveProperty("stock", 20);
        done();
      });
    });
  });
  describe("error, create Product", () => {
    test("cannot create Product, no access_token", (done) => {
      request(app)
      .post("/products")
      .send({ 
        name: "Alita",
        CategoryId: CategoryId,
        image_url: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ee/Alita_Battle_Angel_%282019_poster%29.png/220px-Alita_Battle_Angel_%282019_poster%29.png",
        price: 200000,
        stock: 20
      })
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Unauthorized Access!");
        done();
      });
    });
    test("cannot create Product, not admin", (done) => {
      request(app)
      .post("/products")
      .set("access_token", customerToken)
      .send({ 
        name: "Alita",
        CategoryId: CategoryId,
        image_url: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ee/Alita_Battle_Angel_%282019_poster%29.png/220px-Alita_Battle_Angel_%282019_poster%29.png",
        price: 200000,
        stock: 20
      })
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Unauthorized Access!");
        done();
      });
    });
    test("cannot create Product, required fields are empty", (done) => {
      request(app)
      .post("/products")
      .set("access_token", adminToken)
      .send({ 
        name: "",
        CategoryId: "",
        image_url: "",
        price: "",
        stock: ""
      })
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("messages", [
                      "Name is required.",
                      "Category is required.",
                      "Image url is required.",
                      "Price is required.",
                      "Stock is required."
        ]);
        done();
      });
    });
    test("cannot create Product, price is less than 0", (done) => {
      request(app)
      .post("/products")
      .set("access_token", adminToken)
      .send({ 
        name: "Alita",
        CategoryId: CategoryId,
        image_url: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ee/Alita_Battle_Angel_%282019_poster%29.png/220px-Alita_Battle_Angel_%282019_poster%29.png",
        price: -200000,
        stock: 20
      })
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("messages", [ 
                      "Price cannot be less than 0."
        ]);
        done();
      });
    });
    test("cannot create Product, stock is less than 0", (done) => {
      request(app)
      .post("/products")
      .set("access_token", adminToken)
      .send({ 
        name: "Alita",
        CategoryId: CategoryId,
        category: "movie",
        image_url: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ee/Alita_Battle_Angel_%282019_poster%29.png/220px-Alita_Battle_Angel_%282019_poster%29.png",
        price: 200000,
        stock: -20
      })
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("messages", [ 
                      "Stock cannot be less than 0."
        ]);
        done();
      });
    });
    test("cannot create Product, price is not numeric", (done) => {
      request(app)
      .post("/products")
      .set("access_token", adminToken)
      .send({ 
        name: "Alita",
        CategoryId: CategoryId,
        image_url: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ee/Alita_Battle_Angel_%282019_poster%29.png/220px-Alita_Battle_Angel_%282019_poster%29.png",
        price: "two hundred thousand",
        stock: 20
      })
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("messages", [ 
                      "Price must be numeric."
        ]);
        done();
      });
    });
    test("cannot create Product, stock is not numeric", (done) => {
      request(app)
      .post("/products")
      .set("access_token", adminToken)
      .send({ 
        name: "Alita",
        CategoryId: CategoryId,
        image_url: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ee/Alita_Battle_Angel_%282019_poster%29.png/220px-Alita_Battle_Angel_%282019_poster%29.png",
        price: 200000,
        stock: "twenty"
      })
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("messages", [ 
                      "Stock must be numeric."
        ]);
        done();
      });
    });
  });
});


/* --------------------------------------UPDATE-------------------------------------- */

describe("update Product PUT /products/:id", () => {
  describe("success, Product udpated", () => {
    test("update Product using ProductId and body property", (done) => {
      request(app)
      .put(`/products/${ProductId}`)
      .set("access_token", adminToken)
      .send({ 
        name: "Alita",
        CategoryId: CategoryId,
        image_url: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ee/Alita_Battle_Angel_%282019_poster%29.png/220px-Alita_Battle_Angel_%282019_poster%29.png",
        price: 180000,
        stock: 40
      })
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(200);
        expect(body).toHaveProperty("id", ProductId);
        expect(body).toHaveProperty("name", "Alita");
        expect(body).toHaveProperty("CategoryId", CategoryId);
        expect(body).toHaveProperty("image_url", "https://upload.wikimedia.org/wikipedia/en/thumb/e/ee/Alita_Battle_Angel_%282019_poster%29.png/220px-Alita_Battle_Angel_%282019_poster%29.png");
        expect(body).toHaveProperty("price", 180000);
        expect(body).toHaveProperty("stock", 40);
        done();
      });
    });
  });
  describe("error, update Product", () => {
    test("cannot udpate Product, no access_token", (done) => {
      request(app)
      .put(`/products/${ProductId}`)
      .send({ 
        name: "Alita",
        CategoryId: CategoryId,
        image_url: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ee/Alita_Battle_Angel_%282019_poster%29.png/220px-Alita_Battle_Angel_%282019_poster%29.png",
        price: 180000,
        stock: 40
      })
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Unauthorized Access!");
        done();
      });
    });
    test("cannot update Product, not admin", (done) => {
      request(app)
      .put(`/products/${ProductId}`)
      .set("access_token", customerToken)
      .send({ 
        name: "Alita",
        CategoryId: CategoryId,
        image_url: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ee/Alita_Battle_Angel_%282019_poster%29.png/220px-Alita_Battle_Angel_%282019_poster%29.png",
        price: 180000,
        stock: 40
      })
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Unauthorized Access!");
        done();
      });
    });
    test("cannot update Product, required fields are empty", (done) => {
      request(app)
      .put(`/products/${ProductId}`)
      .set("access_token", adminToken)
      .send({ 
        name: "",
        CategoryId: "",
        image_url: "",
        price: "",
        stock: ""
      })
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("messages", [
                      "Name is required.",
                      "Category is required.",
                      "Image url is required.",
                      "Price is required.",
                      "Stock is required."
        ]);
        done();
      });
    });
    test("cannot update Product, price is less than 0", (done) => {
      request(app)
      .put(`/products/${ProductId}`)
      .set("access_token", adminToken)
      .send({ 
        name: "Alita",
        CategoryId: CategoryId,
        image_url: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ee/Alita_Battle_Angel_%282019_poster%29.png/220px-Alita_Battle_Angel_%282019_poster%29.png",
        price: -200000,
        stock: 20
      })
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("messages", [ 
                      "Price cannot be less than 0."
        ]);
        done();
      });
    });
    test("cannot update Product, stock is less than 0", (done) => {
      request(app)
      .put(`/products/${ProductId}`)
      .set("access_token", adminToken)
      .send({ 
        name: "Alita",
        CategoryId: CategoryId,
        image_url: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ee/Alita_Battle_Angel_%282019_poster%29.png/220px-Alita_Battle_Angel_%282019_poster%29.png",
        price: 200000,
        stock: -20
      })
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("messages", [ 
                      "Stock cannot be less than 0."
        ]);
        done();
      });
    });
    test("cannot update Product, price is not numeric", (done) => {
      request(app)
      .put(`/products/${ProductId}`)
      .set("access_token", adminToken)
      .send({ 
        name: "Alita",
        CategoryId: CategoryId,
        image_url: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ee/Alita_Battle_Angel_%282019_poster%29.png/220px-Alita_Battle_Angel_%282019_poster%29.png",
        price: "two hundred thousand",
        stock: 20
      })
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("messages", [ 
                      "Price must be numeric."
        ]);
        done();
      });
    });
    test("cannot update Product, stock is not numeric", (done) => {
      request(app)
      .put(`/products/${ProductId}`)
      .set("access_token", adminToken)
      .send({ 
        name: "Alita",
        CategoryId: CategoryId,
        image_url: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ee/Alita_Battle_Angel_%282019_poster%29.png/220px-Alita_Battle_Angel_%282019_poster%29.png",
        price: 200000,
        stock: "twenty"
      })
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("messages", [ 
                      "Stock must be numeric."
        ]);
        done();
      });
    });
  });
});


/* --------------------------------------DELETE-------------------------------------- */

describe("delete Product DELETE /products/:id", () => {
  describe("error, delete Product", () => {
    test("cannot delete Product, no access_token", (done) => {
      request(app)
      .delete(`/products/${ProductId}`)
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Unauthorized Access!");
        done();
      });
    });
    test("cannot delete Product, not admin", (done) => {
      request(app)
      .delete(`/products/${ProductId}`)
      .set("access_token", customerToken)
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Unauthorized Access!");
        done();
      });
    });
  });
  describe("success, Product deleted", () => {
    test("delete Product using ProductId", (done) => {
      request(app)
      .delete(`/products/${ProductId}`)
      .set("access_token", adminToken)
      .end((err, res) => {
        const { body, status } = res;
        if (err) {
          return done(err);
        }
        expect(status).toBe(200);
        expect(body).toHaveProperty("message", "The product has been successfully deleted.");
        done();
      });
    });
  });
});