const request = require('supertest')
const app = require('../app')
const Helper = require('../helpers/helper')

let access_token = ''
beforeAll((done)=>{
  access_token = Helper.generateToken({id: 1, email: `admin@mail.com`})
  done()
})

describe('Read all product GET /products', () => {
  describe('Success read', () => {
    test('response with result ', done => {
      request(app)
        .get('/products')
        .set('access_token', access_token)
        .end((err, res)=>{
          const { body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(200)
          expect(body).toHaveProperty('result')
          done()
        })
      
    })
  })
})