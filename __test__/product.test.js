const {
    request,
    app,
    User,
    Product,
    generateToken
} = require('./module');

const productUrl = '/product'

const adminSampleDB = {
    email: "adminSample@mail.com",
    password: '1234',
    role: 'admin'
}

let adminSampleInput;

const validInputPost = {
    name: 'ProductSample',
    image_url: 'ImageSample',
    price: 321,
    stock: 123
}

const validationErrorInput = {
    kosong: null,
    string: 'lalala',
    number: 123,
    negatif: -123
}

let validSamplePost;

beforeAll((done)=>{
    User.create(adminSampleDB)
    .then((data)=>{
        adminSampleInput = {
            id: data.id,
            email: data.email,
            password: '1234',
            access_token: generateToken({id: data.id, email: data.email})
        }
        return Product.create(validInputPost);
    })
    .then((data)=>{
        validSamplePost = {
            id: data.id,
            name: data.name,
            image_url: data.image_url,
            price: data.price,
            stock: data.stock
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
        return Product.destroy({where: {name: validSamplePost.name}})
    })
    .then(()=>{
        done();
    })
    .catch((err)=>{
        console.log(err);
        done();
    })
})

describe("Product Route Test", ()=>{
    describe("method GET product on Success", ()=>{
        test("To return array of product data from database", (done)=>{
            request(app)
            .get(productUrl)
            .set("access_token", adminSampleInput.access_token)
            .end((err, res) =>{ 
                const {body, status} = res
                if(err){
                    return done(err);
                }
                expect(status).toBe(200);
                expect(Array.isArray(body)).toBe(true);
                done();
            })
        })
        test("To match properties of every array", (done)=>{
            request(app)
            .get(productUrl)
            .set("access_token", adminSampleInput.access_token)
            .end((err, res) =>{ 
                const {body, status} = res
                if(err){
                    return done(err);
                }
                expect(status).toBe(200);
                for(let i = 0; i < body.length; i++){
                    expect(body[i]).toEqual(
                        expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String),
                        image_url: expect.any(String),
                        price: expect.any(Number), 
                        stock: expect.any(Number)
                        })
                    )
                }
                done();
            })
        })
    })

    describe("method POST product on Success", ()=>{
        test("To return a new created product", (done)=>{
            request(app)
            .post(productUrl)
            .set("access_token", adminSampleInput.access_token)
            .send(validInputPost)
            .end((err, res) =>{ 
                const {body, status} = res
                if(err){
                    return done(err);
                }
                expect(status).toBe(201);
                expect(body).toEqual(
                    expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    image_url: expect.any(String),
                    price: expect.any(Number), 
                    stock: expect.any(Number)
                    })
                );
                done();
            })
        })
    })
    
    // describe("Product POST product on Fail", ()=>{
    //     test("When input error on validation", (done)=>{
    //         request(app)
    //         .post(productUrl)
    //         .set("access_token", adminSampleInput.access_token)
    //         .send(validationErrorInput)
    //         .end((err, res)=>{
    //             const {body, status} = res;
    //             if(err){
    //                 return done(err);
    //             }
    //             expect(status).toBe(400);
    //             done();
    //         })
    //     })
    // })

    // describe("Product PUT product on Success", (done)=>{

    // })
    // describe("Product PUT product on Fail", (done)=>{

    // })
    // describe("Product PATCH product on Success", (done)=>{

    // })
    // describe("Product PATCH product on Fail", (done)=>{

    // })
    // describe("Product DELETE product on Success", (done)=>{

    // })
    // describe("Product DELETE product on Fail", (done)=>{

    // })
})
