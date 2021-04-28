const app = require('../app');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const { Product } = require('../models')

let access_token;
let paramsId;

describe("testing before GET /products, need Access_token", function(){
    // afterAll(function(done){
    //     Product.destroy({ where: {} })
    //     .then(() => done())
    //     .catch(done)
    // })

    // For Access Token
    beforeAll(function (done) {
        // Login
        access_token = jwt.sign({ id:1, email:"admin@mail.com", role: "admin" }, process.env.JWT_SECRET)

        // Token admin Check
        let currentUser = jwt.verify(access_token, process.env.JWT_SECRET);
        let role = currentUser.role;
        if (role === 'admin') {
            done()
        } else {
            throw new Error('Unauthorized, only admin can login to this page')
        }
    })

    // Case Succesfully Read
    describe("testing GET /products success", function() {
        it("should return response with 200", function(done) {
            // setup

            // Execute 
            request(app)
            .get('/products')
            .set('access_token', access_token)
            .end(function (err, res){
                // Assert
                if (err) {
                    done(err)
                } else {
                    // console.log({ res })
                    expect(res.statusCode).toEqual(200)
                    expect(typeof res.body).toEqual("object")

                    done()
                }
            })
        })
    })

    describe("testing GET /products/:id success", function() {
        beforeAll(function (done) {
            // Create product
        const body = {
            name: "Kemeja",
            category: "Fashion",
            stock: 10000,
            price: 15000000,
            image_url: "https://i.pinimg.com/originals/53/90/9e/53909e636492f974c71e5ae268b055b8.jpg",
            UserId: 1
        }

        request(app)
            .post(`/products`)
            .send(body)
            .set('access_token', access_token)
            .end(function(err, res){
                if(err) {
                    done(err)
                } else {
                    // console.log({ res })
                    paramsId = res.body.newProduct.id
                    // console.log(res.body.newProduct.id)
                    // console.log(paramsId)
                    done()
                }
            })
        })

        it("should return response with 200", function(done) {
            // setup

            // Execute 
            request(app)
            .get(`/products/${paramsId}`)
            .set('access_token', access_token)
            .end(function (err, res){
                // Assert
                if (err) {
                    done(err)
                } else {
                    // console.log({ res })
                    expect(res.statusCode).toEqual(200)
                    expect(typeof res.body).toEqual("object")

                    done()
                }
            })
        })

        it("should return response with 404", function(done) {
            // setup

            // Execute 
            request(app)
            .get(`/products/${999999999}`)
            .set('access_token', access_token)
            .end(function (err, res){
                // Assert
                if (err) {
                    done(err)
                } else {
                    // console.log({ res })
                    expect(res.statusCode).toEqual(404)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty("message")
                    expect(typeof res.body.message).toEqual("string", "Data not found")

                    done()
                }
            })
        })
    })
 


})
