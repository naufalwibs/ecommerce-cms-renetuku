const app = require('../app');
const request = require('supertest');
const jwt = require('jsonwebtoken');

let access_token;
let paramsId;

describe("testing before PUT /banners/:id, need Access_token", function(){

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
    describe("testing PUT /banners/:id success", function() {
        beforeAll(function (done) {
        // Create banner
        const body = {
            banner_url: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/1179773960665.5886301f3823d.jpg",
            category: "Fashion",
            status: "Inactive",
            UserId: 1
        }

        request(app)
            .post('/banners')
            .send(body)
            .set('access_token', access_token)
            .end(function(err, res){
                if(err) {
                    done(err)
                } else {
                    // console.log({ res })
                    paramsId = res.body.newBanner.id
                    // console.log(res.body.newBanner.id)
                    // console.log(paramsId)
                    done()
                }
            })
        })

        it("should return response with 200", function(done) {
            // setup
            const body = {
                banner_url: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/1179773960665.5886301f3823d.jpg",
                category: "Fashion",
                status: "Active",
                UserId: 1
            }
            // Execute 
            request(app)
            .put(`/banners/${paramsId}`)
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
                    expect(typeof res.body.message).toEqual("string", "Banner Updated Succesfully")

                    done()
                }
            })
        })
    })

    describe("testing PUT /banners/:id failed", function() {
        it("should return response with 400", function(done) {
            // setup Stock and Price is minus
            const body = {
                banner_url: "bukan url",
                category: "",
                status: "",
                UserId: ""
            }
            // Execute 
            request(app)
            .put(`/banners/${paramsId}`)
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
                            "Can only insert url format", 
                            "Category can't be empty", 
                            "Status can't be empty"
                        ])
                    )
                    done()
                }
            })
        })
        it("should return response with 404", function(done) {
            // 404
            const body = {
                banner_url: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/1179773960665.5886301f3823d.jpg",
                category: "Fashion",
                status: "Active",
                UserId: 1
            }
            // Execute 
            request(app)
            .put(`/banners/${99999999}`)
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
