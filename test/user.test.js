const request = require('supertest')
const app = require('../app')
const {sequelize, User} = require('../models')
const {queryInterface} = sequelize
const Helper = require('../helpers/helper')

let data_admin = {
  email: `admin2@mail.com`,
  password: Helper.generatePassword('1234567'),
  role: 'admin'
}

let access_token = ''
beforeAll(async (done)=>{
  try{
    const dataAdmin = await User.create(data_admin)
    if(dataAdmin) access_token = Helper.generateToken({id: dataAdmin.id, email: dataAdmin.email})
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
    done()
  }catch(err){
    done(err)
  }
})

describe('Login User POST /admin/login', () => {
  describe('Success Login', () => {
    test(`response with access token `, (done)=>{
      request(app)
        .post('/admin/login')
        .send({
          email: `admin@mail.com`,
          password: `1234567`
        })
        .end((err, res)=>{
          const {body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(200)
          expect(body).toHaveProperty('email', 'admin@mail.com')
          expect(body).toHaveProperty('access_token', expect.any(String))
          done()
        })
    })
  })
  describe('Error Login with Wrong Password', () => {
    test(`Invalid email / password `, (done)=>{
      request(app)
        .post('/admin/login')
        .send({
          email: `admin@mail.com`,
          password: `12345`
        })
        .end((err, res)=>{
          const {body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', `Invalid email / password !`)
          done()
        })
    })
  })
  describe('Error Login with No Account', () => {
    test(`Invalid Account `, (done)=>{
      request(app)
        .post('/admin/login')
        .send({
          email: `ghost@mail.com`,
          password: `1234567`
        })
        .end((err, res)=>{
          const {body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', `Invalid account !`)
          done()
        })
    })
  })
  describe('Error Login with empty input', () => {
    test(`empty input`, (done)=>{
      request(app)
        .post('/admin/login')
        .send({
          email: '',
          password: ''
        })
        .end((err, res)=>{
          const {body, status } = res
          if(err){
            return done(err)
          }
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', `Invalid account !`)
          done()
        })
    })
  })
})

