const {
    request,
    app,
    User,
    verifyToken,
} = require('./module');

const loginUrl = '/login'

let adminSampleDB = {
    email: "adminSample@mail.com",
    password: '1234',
    role: 'admin'
}

let adminSampleInput = {};

beforeAll((done)=>{
  console.log('Lalala');
    User.create(adminSampleDB)
    .then((data)=>{
        adminSampleInput = {
            id: data.id,
            email: data.email,
            password: '1234'
        }
        done();
    })
    .catch((err)=>{
        console.log(err);
        done();
    })
})

afterAll((done)=>{
    User.destroy({where: {id: adminSampleInput.id}})
    .then(()=>{
        done();
    })
    .catch((err)=>{
        console.log(err);
        done();
    })
})

describe("User Route Test", ()=>{
    describe("User POST Login Test On Success", ()=>{
        test("To Have Property access_token", (done)=>{
            request(app)
            .post(loginUrl)
            .send({
                email: adminSampleInput.email,
                password: adminSampleInput.password
            })
            .end((err, res) =>{ 
                const {body, status} = res
                if(err){
                    return done(err);
                }
                expect(status).toBe(200);
                expect(body).toHaveProperty("access_token");
                done();
            })
        })

        test("To contain Email & Password after verify access_token", (done)=>{
            request(app)
            .post(loginUrl)
            .send({
                email: adminSampleInput.email,
                password: adminSampleInput.password
            })
            .end((err, res) =>{ 
                const {body, status} = res
                if(err){
                    return done(err);
                }
                const decoded = verifyToken(body.access_token)
                const toBeExpect = {
                    id: decoded.id,
                    email: decoded.email
                }
                expect(status).toBe(200);
                expect(toBeExpect).toEqual(
                    expect.objectContaining({
                    id: expect.any(Number),
                    email: expect.any(String)
                    })
                )
                done();
            })
        })

        test("To have valid Email & Password after verify access_token", (done)=>{
            request(app)
            .post(loginUrl)
            .send({
                email: adminSampleInput.email,
                password: adminSampleInput.password
            })
            .end((err, res) =>{ 
                const {body, status} = res
                if(err){
                    return done(err);
                }
                expect(status).toBe(200);
                const decoded = verifyToken(body.access_token);
                const toBeExpect = {
                    id: decoded.id,
                    email: decoded.email
                }
                expect(toBeExpect).toEqual(
                    expect.objectContaining({
                    id: adminSampleInput.id,
                    email: adminSampleInput.email
                    })
                )
                done();
            })
        })
    })
    describe("User POST Login Test On Fail", ()=>{
        test("When Email not in database", (done)=>{
            request(app)
            .post(loginUrl)
            .send({
                email: 'random@mail.com',
                password: 'random'
            })
            .end((err, res) =>{ 
                const {body, status} = res
                if(err){
                    return done(err);
                }
                expect(status).toBe(400);
                expect(body).toEqual(
                    expect.objectContaining({
                    message: 'Email / Password Incorrect'
                    })
                )
                done();
            })
        })
        
        test("When Password is Incorrect", (done)=>{
            request(app)
            .post(loginUrl)
            .send({
                email: adminSampleInput.email,
                password: 'random'
            })
            .end((err, res) =>{ 
                const {body, status} = res
                if(err){
                    return done(err);
                }
                expect(status).toBe(400);
                expect(body).toEqual(
                    expect.objectContaining({
                    message: 'Email / Password Incorrect'
                    })
                )
                done();
            })
        })
    })
})

