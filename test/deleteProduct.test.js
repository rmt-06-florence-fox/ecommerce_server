const request = require('supertest')
const app = require('../app')
const Helper = require('../helpers/helper')

let id = 33
let access_token = ''
let failed_access_token = ''
beforeAll((done)=>{
  access_token = Helper.generateToken({id: 1, email: `admin@mail.com`})
  failed_access_token = Helper.generateToken({id: 2, email: `ghost@mail.com`})
  done()
})

describe('DELETE /products/:id', () => {
  describe('Success delete', () => {
    test('response with message ', done => {
      request(app)
        .delete('/products/' + id)
        .set('access_token', access_token)
        .end((err, res)=>{
          const { body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(200)
          expect(body).toHaveProperty('message', `Successfully deleted data product !`)
          done()
        })    
    })
  })
  describe('Error Delete because Access Token', () => {
    test('response error because No Access Token ', done => {
      request(app)
        .delete('/products/' + id)
        .set('access_token', '')
        .end((err, res)=>{
          const { body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(401)
          expect(body).toHaveProperty('message')
          done()
        })    
    })
    test('response error because Not admin ', done => {
      request(app)
        .delete('/products/' + id)
        .set('access_token', failed_access_token)
        .end((err, res)=>{
          const { body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(401)
          expect(body).toHaveProperty('message')
          done()
        })    
    })
  })
})
