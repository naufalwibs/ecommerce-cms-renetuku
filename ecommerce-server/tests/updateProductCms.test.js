const app = require('../app');
const request = require('supertest');
const jwt = require('jsonwebtoken');

let access_token;
let paramsId;

describe("testing before PUT /products/:id, need Access_token", function(){

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

    // Case Succesfully Updated
    describe("testing PUT /products/:id success", function() {
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
            .post('/products')
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
            const body = {
                name: "Kemeja Untukloh",
                category: "Fashion",
                stock: 1000,
                price: 250000,
                image_url: "https://garmenesia.co.id/wp-content/uploads/2018/10/konveksi-kemeja-formal.png"
            }
            // Execute 
            request(app)
            .put(`/products/${paramsId}`)
            .send(body)
            .set('access_token', access_token)
            .end(function (err, res){
                // Assert
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(200)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty("message")
                    expect(typeof res.body.message).toEqual("string", "Product Updated Succesfully")

                    done()
                }
            })
        })
    })

    describe("testing PUT /products/:id failed", function() {
        it("should return response with 400", function(done) {
            // setup Stock and Price is minus
            const body = {
                name: "Kemeja Untukloh",
                category: "Fashion",
                stock: -1,
                price: -1,
                image_url: "https://garmenesia.co.id/wp-content/uploads/2018/10/konveksi-kemeja-formal.png"
            }
            // Execute 
            request(app)
            .put(`/products/${paramsId}`)
            .send(body)
            .set('access_token', access_token)
            .end(function (err, res){
                // Assert
                if (err) {
                    done(err)
                } else {
                    // console.log({ res })
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty("message")
                    expect(typeof res.body.message).toEqual("string")
                    expect(Array.isArray(res.body.detail)).toEqual(true)
                    expect(res.body.detail).toEqual(
                        expect.arrayContaining([
                            "Can only insert valid value / greater than equal 0",
                            "Can only insert valid value / greater than equal 0",
                        ])
                    )
                    done()
                }
            })
        })
        it("should return response with 400", function(done) {
            // setup Stock and Price are string, img_url is string
            const body = {
                name: "Kemeja Untukloh",
                category: "Fashion",
                stock: "string",
                price: "string",
                image_url: "noturl"
            }
            // Execute 
            request(app)
            .put(`/products/${paramsId}`)
            .send(body)
            .set('access_token', access_token)
            .end(function (err, res){
                // Assert
                if (err) {
                    done(err)
                } else {
                    // console.log({ res })
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty("message")
                    expect(typeof res.body.message).toEqual("string")
                    expect(Array.isArray(res.body.detail)).toEqual(true)
                    expect(res.body.detail).toEqual(
                        expect.arrayContaining([
                            "Can only insert valid value / greater than 0", 
                            "Can only insert valid value / greater than 0", 
                            "Can only insert url format"
                        ])
                    )
                    done()
                }
            })
        })
        it("should return response with 404", function(done) {
            // 404
            const body = {
                name: "Kemeja Untukloh",
                category: "Fashion",
                stock: "string",
                price: "string",
                image_url: "noturl"
            }
            // Execute 
            request(app)
            .put(`/products/${99999999}`)
            .send(body)
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
