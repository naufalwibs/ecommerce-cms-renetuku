const app = require('../app');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const { Banner } = require('../models')

let access_token;

describe("testing before POST /banners, need Access_token", function() {

    // For access_token
    beforeAll(function (done) {
        // Login
        access_token = jwt.sign({ id: 1, email: "admin@mail.com", role: "admin"}, process.env.JWT_SECRET)

        // Token admin check
        let currentUser = jwt.verify(access_token, process.env.JWT_SECRET);
        let role = currentUser.role;
        if (role === "admin") {
            done()
        } else {
            throw new Error('Unauthorized, only admin can login to this page')
        }
    })

    describe("testing POST /banners succes", function() {
        it("should return response with 201", function(done) {
            // setup
            const body = {
                banner_url: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/1179773960665.5886301f3823d.jpg",
                category: "Fashion",
                status: "Active",
                UserId: 1
            }

            // Execeute
            request(app)
            .post('/banners')
            .send(body)
            .set('access_token', access_token)
            .end(function (err, res) {
                // Assert
                if (err) {
                    done(err)
                } else {
                    // console.log({ res })
                    expect(res.statusCode).toEqual(201);
                    expect(typeof res.body.newBanner).toEqual("object");
                    expect(res.body.newBanner).toHaveProperty("banner_url");
                    expect(typeof res.body.newBanner.banner_url).toEqual("string");
                    expect(res.body.newBanner).toHaveProperty("category");
                    expect(typeof res.body.newBanner.category).toEqual("string");
                    expect(res.body.newBanner).toHaveProperty("status");
                    expect(typeof res.body.newBanner.status).toEqual("string")

                    done();
                }
            })
        })
    })

    it("should return response with 400", function(done) {
        // Setup
        const body = {
            banner_url: "",
            category: "",
            status: "",
            UserId: 1,
        }

        // Execute
        request(app)
        .post('/banners')
        .send(body)
        .set('access_token', access_token)
        .end(function (err, res) {
            if (err) {
                done (err)
            } else {
                console.log({ res })
                expect(res.statusCode).toEqual(400);
                expect(typeof res.body).toEqual("object")
                expect(res.body).toHaveProperty("detail");
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

})