const app = require('../app');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const { Banner } = require('../models');

let access_token;
let paramsId;

describe("testing before GET /banners, need Access_token", function() {
    // afterAll(function(done) {
    //     Banner.destroy({ where: {}})
    //     .then(() => done())
    //     .catch(done)
    // })

    // For Access Token
    beforeAll(function(done) {
        // Login
        access_token = jwt.sign({id: 1, email:"admin@mail.com", role:"admin"}, process.env.JWT_SECRET)

         // Token admin Check
         let currentUser = jwt.verify(access_token, process.env.JWT_SECRET);
         let role = currentUser.role;
         if (role === 'admin') {
             done()
         } else {
             throw new Error('Unauthorized, only admin can login to this page')
         }
    })

    // Case Succesfully Read All
    describe("testing GET /banners success", function() {
        it("should return response with 200", function(done) {
            // setup

            // Execute
            request(app)
            .get('/banners')
            .set('access_token', access_token)
            .end(function(err, res) {
                // Assert
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(200)
                    expect(typeof res.body).toEqual("object")
                    done()
                }
            })
        })
    })

    // Case Read By Id
    describe("testing GET /banners/:id success", function() {
        //Create Product Simulation
        beforeAll(function(done) {
            const body = {
                banner_url: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/1179773960665.5886301f3823d.jpg",
                category: "Fashion",
                status: "Active",
                UserId: 1
            }

            // Execute BA
            request(app)
            .post('/banners')
            .send(body)
            .set('access_token', access_token)
            .end(function(err, res) {
                if (err) {
                    done(err)
                } else {
                    paramsId = res.body.newBanner.id
                    done()
                }
            })
        })

        it("should return response with 200", function(done) {
            // setup

            // Execute
            request(app)
            .get(`/banners/${paramsId}`)
            .set('access_token', access_token)
            .end(function(err, res) {
                if (err) {
                    // Assert
                    done(err)
                } else {
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
            .get(`/banners/${999999999}`)
            .set('access_token', access_token)
            .end(function(err, res) {
                if (err) {
                    // Assert
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(404)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty("message")
                    expect(typeof res.body.message).toEqual("string", "Data not found")

                    done()
                }
            })
        })

    })

})