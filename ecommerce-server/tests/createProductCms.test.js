const app = require('../app');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const { Product } = require('../models')

let access_token;

describe("testing before POST /products, need Access_token", function(){
    
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

    // Case Succesfully Created
    describe("testing POST /products success", function() {
        it("should return response with 201", function(done) {
            // setup
            const body = {
                name: "Kemeja Untukloh",
                category: "Fashion",
                stock: 1000,
                price: 250000,
                image_url: "https://garmenesia.co.id/wp-content/uploads/2018/10/konveksi-kemeja-formal.png",
                UserId: 1
            }
            // Execute 
            request(app)
            .post('/products')
            .send(body)
            .set('access_token', access_token)
            .end(function (err, res){
                // Assert
                if (err) {
                    done(err)
                } else {
                    // console.log({ res })
                    // console.log(res.body.newProduct)
                    expect(res.statusCode).toEqual(201)
                    expect(typeof res.body.newProduct).toEqual("object")
                    expect(res.body.newProduct).toHaveProperty("id")
                    expect(typeof res.body.newProduct.id).toEqual("number")
                    expect(res.body.newProduct).toHaveProperty("name")
                    expect(typeof res.body.newProduct.name).toEqual("string")
                    expect(res.body.newProduct).toHaveProperty("category")
                    expect(typeof res.body.newProduct.category).toEqual("string")
                    expect(res.body.newProduct).toHaveProperty("stock")
                    expect(typeof res.body.newProduct.stock).toEqual("number")
                    expect(res.body.newProduct).toHaveProperty("price")
                    expect(typeof res.body.newProduct.price).toEqual("number")
                    expect(res.body.newProduct).toHaveProperty("image_url")
                    expect(typeof res.body.newProduct.image_url).toEqual("string")
                    expect(res.body.newProduct).toHaveProperty("UserId")
                    expect(typeof res.body.newProduct.UserId).toEqual("number")

                    done()
                }
            })
        })
    })

    describe("testing POST /products failed", function() {
        it("should return response with 400", function(done) {
            // setup
            const body = {
                name: "",
                category: "",
                stock: "",
                price: "",
                image_url: "",
                UserId: 1
            }
            // Execute 
            request(app)
            .post('/products')
            .send(body)
            .set('access_token', access_token)
            .end(function (err, res){
                // Assert
                if (err) {
                    done(err)
                } else {
                    // console.log({res})
                    // console.log(res.body.detail)
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty("detail")
                    expect(Array.isArray(res.body.detail)).toEqual(true)
                    expect(res.body.detail).toEqual(
                        expect.arrayContaining([
                        "Product name can't be empty",
                        "Category can't be empty",
                        "Stock can't be empty",
                        "Can only insert valid value / greater than 0",
                        "Price can't be empty",
                        "Can only insert valid value / greater than 0",
                        "Can only insert url format"
                        ])
                    )

                    done()
                }
            })
        })
        it("should return response with 400", function(done) {
            // setup
            // Stock, price minus number, img not url
            const body = {
                name: "Kemeja",
                category: "Fashion",
                stock: -1,
                price: -1,
                image_url: "noturl",
                UserId: 1
            }
            // Execute 
            request(app)
            .post('/products')
            .send(body)
            .set('access_token', access_token)
            .end(function (err, res){
                // Assert
                if (err) {
                    done(err)
                } else {
                    // console.log({res})
                    // console.log(res.body.detail)
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty("detail")
                    expect(Array.isArray(res.body.detail)).toEqual(true)
                    expect(res.body.detail).toEqual(
                        expect.arrayContaining([
                            "Can only insert valid value / greater than equal 0",
                            "Can only insert valid value / greater than equal 0",
                            "Can only insert url format"
                        ])
                    )
                    done()
                }
            })
        })
        it("should return response with 400", function(done) {
            // setup
            // Stock, price, image_url as string
            const body = {
                name: "Kemeja",
                category: "Fashion",
                stock: "String",
                price: "String",
                image_url: "noturl",
                UserId: 1
            }
            // Execute 
            request(app)
            .post('/products')
            .send(body)
            .set('access_token', access_token)
            .end(function (err, res){
                // Assert
                if (err) {
                    done(err)
                } else {
                    // console.log({res})
                    // console.log(res.body.detail)
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty("detail")
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
    })



})
