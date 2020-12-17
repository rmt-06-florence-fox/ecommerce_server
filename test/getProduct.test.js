const request = require('supertest')
const app = require('../app')
const {sequelize, Product} = require('../models')
const {queryInterface} = sequelize

let data = {
  name: `Al-Qur'an`,
  image_url: 'https://i.pinimg.com/564x/d1/d3/65/d1d36559c2ed91e701609a1aa96994b0.jpg',
  price: 100000,
  stock: 17
}
beforeAll(async (done) => {
  try {
    await Product.create(data)
    await Product.create(data)
    done()
  }catch(err) {
    done(err)
  }
})
afterAll(async (done)=>{
  try{
    await queryInterface.bulkDelete('Products', null, {})
    done()
  }catch(err){
    done(err)
  }
})

describe('GET /products', () => {
  describe('Success get', () => {
    test('response with data', done =>{
      request(app)
        .get('/products')
        .end((err, res)=>{
          const { body, status } = res
          if(err) return done(err)
          expect(status).toBe(200)
          expect(body).toHaveProperty('result')
          done()
        })
    })
  })
})

