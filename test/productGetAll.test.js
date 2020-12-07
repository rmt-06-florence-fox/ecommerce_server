const request = require('supertest')
const app = require('../app')
const Jwt = require('../helper/jwt')
let token = null
const expectResult = [{"createdAt": "2020-12-07T14:16:46.480Z", "id": 1, "image_url": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.logolynx.com%2Ftopic%2Fgudang%2Bgaram&psig=AOvVaw3WWn7hCG8Mj2gBQ25W8fqy&ust=1607435942181000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNjA8dWDvO0CFQAAAAAdAAAAABAN", "name": "Gudang Garam", "price": 20000, "stock": 2000, "updatedAt": "2020-12-07T14:16:46.480Z"}, {"createdAt": "2020-12-07T14:16:46.604Z", "id": 2, "image_url": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.logolynx.com%2Ftopic%2Fgudang%2Bgaram&psig=AOvVaw3WWn7hCG8Mj2gBQ25W8fqy&ust=1607435942181000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNjA8dWDvO0CFQAAAAAdAAAAABAN", "name": "Gudang Garam", "price": 20000, "stock": 2000, "updatedAt": "2020-12-07T14:16:46.604Z"}]
beforeAll((done) => {
    token = Jwt.Sign({email : 'admin@mail.com', password: 'admin'})
    done()
})

describe(`Show All Product GET /product`, () => {
    test(`succes find all`, (done) => {
        request(app)
        .get('/product')
        .set('access_token', token)
        .end((err, res) => {
            const {status, body} = res
            if (err) {
                console.log('masuk <<<<<');
                return done(err)
            }else{
                expect(status).toBe(201)
                expect.arrayContaining(expectResult)
                done()
            }
        })
    })
})