const app = require('../app');
const request = require('supertest');
const { getToken } = require('../helper/jwt')

const { sequelize } = require("../models")
const { queryInterface } = sequelize

const data = {
  name : 'Sapi',
  image_url : "link gambar",
  price : 3000000,
  stock : 4
}

const dataEmptyName = {
  name : "",
  image_url : "link gambar",
  price : 3000000,
  stock : 4
}

const dataEmptyImageUrl = {
  name : "sapi",
  image_url : "",
  price : 3000000,
  stock : 4
}

const dataZeroPrice = {
  name : "sapi",
  image_url : "link gambar",
  price : 0,
  stock : 4
}

const dataNegativePrice = {
  name : "sapi",
  image_url : "link gambar",
  price : -1,
  stock : 4
}

const dataNonIntPrice = {
  name : "sapi",
  image_url : "link gambar",
  price : "satu",
  stock : 4
}

//stock

const dataZeroStock = {
  name : "sapi",
  image_url : "link gambar",
  price : 300000,
  stock : 0
}

const dataNegativeStock = {
  name : "sapi",
  image_url : "link gambar",
  price : 300000,
  stock : -4
}

const dataNonIntStock = {
  name : "sapi",
  image_url : "link gambar",
  price : 3000000,
  stock : "empat"
}



let token
let wrongToken
let id

beforeAll( (done) =>{
  
  // Get admin token 
  const payLoad = {
    id  : 8,
    email: "admin@mail.com"
  }
  token = getToken(payLoad)

  // get non admin token 
  const wrongPayload = {
    id : 9,
    email : 'wrong@mail.com'
  }
  wrongToken = getToken(wrongPayload)
  done()
} )

afterAll( (done) =>{
  queryInterface.bulkDelete("Products")
  done()
} )

describe('Success CRUD product ', () =>{

  describe(' Success Create New Product' , () =>{
    test("create product with admin acces token", (done) =>{
      request(app)
      .post('/product')
      .send(data)
      .set('access_token', token)
      .end( (err,res) =>{
        const { body,status } =res
        if(err){
          return done(err)
        }
        id = body.id
        expect(status).toBe(201)
        expect( body ).toHaveProperty( "name" ,"Sapi")
        expect( body ).toHaveProperty( "image_url" ,"link gambar")
        expect( body ).toHaveProperty( "price" ,3000000)
        expect( body ).toHaveProperty( "stock" , 4 )
        done()
      })
    })
  }) 

  describe('Succes Get all data', () =>{
    test("get all data in database", (done) =>{
      request(app)
      .get('/product')
      .end((err,res) =>{
        const { body,status } = res

        if(err){
          return done(err)
        }
        console.log(body)
        expect(status).toBe(200)
        expect(body.data[0]).toHaveProperty("name",expect.any(String))
        expect(body.data[0]).toHaveProperty("image_url",expect.any(String))
        expect(body.data[0]).toHaveProperty("price",expect.any(Number))
        expect(body.data[0]).toHaveProperty("stock",expect.any(Number))
        done()
      })
    })
  })

  describe(' Success Replace New Product' , () =>{
    test("Replace product with admin token", (done) =>{
      request(app)
      .put(`/product/${id}`)
      .set('access_token', token)
      .end( (err,res) =>{
        const { body,status } =res
        if(err){
          return done(err)
        }

        expect(status).toBe(200)
        expect(body).toHaveProperty("message", "succes modified")
        done()
      })
    })
  }) 

  describe(' Success delete New Product' , () =>{
    test("delete product with admin token", (done) =>{
      request(app)
      .delete(`/product/${id}`)
      .set('access_token', token)
      .end( (err,res) =>{
        const { body,status } =res
        if(err){
          return done(err)
        }

        expect(status).toBe(200)
        expect(body).toHaveProperty("message", "succes delete product")
        done()
      })
    })
  }) 

})


describe( 'Fail Create Product ', () =>{
  

  describe('Failed get token', () =>{
    test('Cant get token', (done) =>{
      request(app)
        .post('/product')
        .send(data)
        .end( (err,res) =>{
          const { body, status } = res
          if(err){
            done(err)
          }

          expect(status).toBe(401)
          expect(body).toHaveProperty("msg", "please login")
          done()
        } )

    })
  })

  describe('Unauthorize to crete product', () =>{
    test('unauthorize to create product', (done) =>{
      request(app)
        .post('/product')
        .set("access_token", wrongToken)
        .send(data)
        .end((err,res) =>{
          const {body,status} =res

          if(err){
            done(err)
          }

          expect(status).toBe(401)
          expect(body).toHaveProperty("msg","Unauthorize access")
          done()
        })
    })
  })

  describe("Get empty name", () =>{
    test('Insert empty name of product', (done) =>{
      request(app)
        .post('/product')
        .set("access_token", token)
        .send(dataEmptyName)
        .end((err,res) =>{
          const {body,status} = res
          if(err){
            done(err)
          }

          expect(status).toBe(400)
          expect(body).toHaveProperty("msg", "Name required")
          done()
        })
    })
  })

  describe("Get empty image url", () =>{
    test('Insert empty image url of product', (done) =>{
      request(app)
        .post('/product')
        .set("access_token", token)
        .send(dataEmptyImageUrl)
        .end((err,res) =>{
          const {body,status} = res
          if(err){
            done(err)
          }

          expect(status).toBe(400)
          expect(body).toHaveProperty("msg", "image Url Required")
          done()
        })
    })
  })


  describe("Get zero price", () =>{
    test('Insert zero price', (done) =>{
      request(app)
        .post('/product')
        .set("access_token", token)
        .send(dataZeroPrice)
        .end((err,res) =>{
          const {body,status} = res
          if(err){
            done(err)
          }

          expect(status).toBe(400)
          expect(body).toHaveProperty("msg", "Please insert the right price")
          done()
        })
    })
  })

  describe("Get negative price", () =>{
    test('Insert negative price', (done) =>{
      request(app)
        .post('/product')
        .set("access_token", token)
        .send(dataNegativePrice)
        .end((err,res) =>{
          const {body,status} = res
          if(err){
            done(err)
          }

          expect(status).toBe(400)
          expect(body).toHaveProperty("msg", "Please insert the right price")
          done()
        })
    })
  })

  describe("Get Non integer price", () =>{
    test('Insert non integer price', (done) =>{
      request(app)
        .post('/product')
        .set("access_token", token)
        .send(dataNonIntPrice)
        .end((err,res) =>{
          const {body,status} = res
          if(err){
            done(err)
          }

          expect(status).toBe(400)
          expect(body).toHaveProperty("msg", "Please insert the right price")
          done()
        })
    })
  })


  // stock

  describe("Get zero stock", () =>{
    test('Insert zero stock', (done) =>{
      request(app)
        .post('/product')
        .set("access_token", token)
        .send(dataZeroStock)
        .end((err,res) =>{
          const {body,status} = res
          if(err){
            done(err)
          }

          expect(status).toBe(400)
          expect(body).toHaveProperty("msg", "Please insert the right stock")
          done()
        })
    })
  })

  describe("Get negative stock", () =>{
    test('Insert negative stock', (done) =>{
      request(app)
        .post('/product')
        .set("access_token", token)
        .send(dataNegativeStock)
        .end((err,res) =>{
          const {body,status} = res
          if(err){
            done(err)
          }

          expect(status).toBe(400)
          expect(body).toHaveProperty("msg", "Please insert the right stock")
          done()
        })
    })
  })

  describe("Get Non integer stock", () =>{
    test('Insert non integer stock', (done) =>{
      request(app)
        .post('/product')
        .set("access_token", token)
        .send(dataNonIntStock)
        .end((err,res) =>{
          const {body,status} = res
          if(err){
            done(err)
          }

          expect(status).toBe(400)
          expect(body).toHaveProperty("msg", "Please insert the right stock")
          done()
        })
    })
  })
})

describe(" Fail Update Product", () =>{


  test('fail get token', (done) =>{
    request(app)
      .put(`/product/${id}`)
      .send(data)
      .end( (err,res) =>{
        const { body, status } = res
        if(err){
          done(err)
        }

        expect(status).toBe(401)
        expect(body).toHaveProperty("msg", "please login")
        done()
      } )
  })

  test('unauthorize to update product', (done) =>{
    request(app)
      .put(`/product/${id}`)
      .set("access_token", wrongToken)
      .send(data)
      .end((err,res) =>{
        const {body,status} =res

        if(err){
          done(err)
        }

        expect(status).toBe(401)
        expect(body).toHaveProperty("msg","Unauthorize access")
        done()
      })
  })

  test('Insert zero price', (done) =>{
    request(app)
      .put(`/product/${id}`)
      .set("access_token", token)
      .send(dataZeroPrice)
      .end((err,res) =>{
        const {body,status} = res
        if(err){
          done(err)
        }

        expect(status).toBe(400)
        expect(body).toHaveProperty("msg", "Please insert the right price")
        done()
      })
  })

  test('Insert negative price', (done) =>{
    request(app)
      .put(`/product/${id}`)
      .set("access_token", token)
      .send(dataNegativePrice)
      .end((err,res) =>{
        const {body,status} = res
        if(err){
          done(err)
        }

        expect(status).toBe(400)
        expect(body).toHaveProperty("msg", "Please insert the right price")
        done()
      })
  })

  test('Insert non integer price', (done) =>{
    request(app)
      .put(`/product/${id}`)
      .set("access_token", token)
      .send(dataNonIntPrice)
      .end((err,res) =>{
        const {body,status} = res
        if(err){
          done(err)
        }

        expect(status).toBe(400)
        expect(body).toHaveProperty("msg", "Please insert the right price")
        done()
      })
  })

  // stock
  test('Insert zero stock', (done) =>{
    request(app)
      .put(`/product/${id}`)
      .set("access_token", token)
      .send(dataZeroStock)
      .end((err,res) =>{
        const {body,status} = res
        if(err){
          done(err)
        }

        expect(status).toBe(400)
        expect(body).toHaveProperty("msg", "Please insert the right stock")
        done()
      })
  })

  test('Insert negative stock', (done) =>{
    request(app)
      .put(`/product/${id}`)
      .set("access_token", token)
      .send(dataNegativeStock)
      .end((err,res) =>{
        const {body,status} = res
        if(err){
          done(err)
        }

        expect(status).toBe(400)
        expect(body).toHaveProperty("msg", "Please insert the right stock")
        done()
      })
  })

  test('Insert non integer stock', (done) =>{
    request(app)
      .put(`/product/${id}`)
      .set("access_token", token)
      .send(dataNonIntStock)
      .end((err,res) =>{
        const {body,status} = res
        if(err){
          done(err)
        }

        expect(status).toBe(400)
        expect(body).toHaveProperty("msg", "Please insert the right stock")
        done()
      })
  })

})

describe("fail delete Product", () =>{


    test('Cant get token', (done) =>{
      request(app)
        .delete(`/product/${id}`)
        .send(data)
        .end( (err,res) =>{
          const { body, status } = res
          if(err){
            done(err)
          }

          expect(status).toBe(401)
          expect(body).toHaveProperty("msg", "please login")
          done()
        } )
    })

    test('unauthorize to create product', (done) =>{
      request(app)
        .delete(`/product/${id}`)
        .set("access_token", wrongToken)
        .send(data)
        .end((err,res) =>{
          const {body,status} =res

          if(err){
            done(err)
          }

          expect(status).toBe(401)
          expect(body).toHaveProperty("msg","Unauthorize access")
          done()
        })
    })




})