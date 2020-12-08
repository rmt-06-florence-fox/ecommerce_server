const request = require('supertest')
const app = require('../app')
const {sequelize, User, Product } = require('../models')
const {queryInterface} = sequelize
const Helper = require('../helpers/helper')

let data = {
  name: `Al-Qur'an`,
  image_url: 'https://i.pinimg.com/564x/d1/d3/65/d1d36559c2ed91e701609a1aa96994b0.jpg',
  price: 100000,
  stock: 17,
  createdAt: new Date(),
  updatedAt: new Date()
}
let data_admin = {
  email: `admin2@mail.com`,
  password: Helper.generatePassword('1234567'),
  role: 'admin'
}
let data_user = {
  email: `user2@mail.com`,
  password: Helper.generatePassword('1234567'),
  role: 'user'
}
let access_token = ''
let access_token_user = ''
let id = ''
beforeAll(async (done)=>{
  try{
    const dataAdmin = await User.create(data_admin)
    if(dataAdmin) access_token = Helper.generateToken({id: dataAdmin.id, email: dataAdmin.email})
    const dataUser = await User.create(data_user)
    if(dataUser) access_token_user = Helper.generateToken({id: dataUser.id, email: dataUser.email})
    const dataProduct = await Product.create(data)
    if (dataProduct) id = dataProduct.id
    done()
  }catch(err){
    done(err)
  }
})
afterAll(async (done)=>{
  try{
    // await queryInterface.bulkDelete('Users', null, {})
    await User.destroy({
      where: {email: data_admin.email}
    })
    await User.destroy({
      where: {email: data_user.email}
    })
    await queryInterface.bulkDelete('Products', null, {})
    done()
  }catch(err){
    done(err)
  }
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
  describe('Error Delete because No Access Token', () => {
    test('should login first ! ', done => {
      request(app)
        .delete('/products/' + id)
        .set('access_token', '')
        .end((err, res)=>{
          const { body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(401)
          expect(body).toHaveProperty('message', 'Please Login First !')
          done()
        })    
    })
  })
  describe('Error Delete because role Not Admin', () => {
    test('unauthorized ! ', done => {
      request(app)
        .delete('/products/' + id)
        .set('access_token', access_token_user)
        .end((err, res)=>{
          const { body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(401)
          expect(body).toHaveProperty('message', `You aren't admin !`)
          done()
        })    
    })
  })  
})
