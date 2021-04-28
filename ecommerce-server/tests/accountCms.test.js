const app = require('../app');
const request = require('supertest');

describe("testing POST /login", function() {
    // Case Success
    it("should return response with status code 200", function(done) {
        // setup
        const body = {
            email: "admin@mail.com",
            password: "1234",
        }
        // execute
        request(app)
        .post("/login")
        .send(body)
        .end(function(err, res){
            if(err) {
                done(err)
            } else {
                // assert
                // console.log({res})
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual("object")
                expect(res.body).toHaveProperty("id")
                expect(typeof res.body.id).toEqual("number")
                expect(res.body).toHaveProperty("email", body.email)
                expect(res.body).toHaveProperty("access_token")

                done()
            }
        })
    })
    // Case empty Password
    it("should return response with status code 401", function(done) {
        // setup
        const body = {
            email: "admin@mail.com",
            password: "",
        }
        // execute
        request(app)
        .post("/login")
        .send(body)
        .end(function(err, res){
            if(err) {
                done(err)
            } else {
                // assert
                // console.log({res})
                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual("object")
                expect(res.body).toHaveProperty("message")
                expect(typeof res.body.message).toEqual("string")
                expect(res.body.message).toEqual("Invalid Email/Password")

                done()
            }
        })
    })
    // Case all empty
    it("should return response with status code 401", function(done) {
        // setup
        const body = {
            email: "",
            password: "",
        }
        // execute
        request(app)
        .post("/login")
        .send(body)
        .end(function(err, res){
            if(err) {
                done(err)
            } else {
                // assert
                // console.log({res})
                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual("object")
                expect(res.body).toHaveProperty("message")
                expect(typeof res.body.message).toEqual("string")
                expect(res.body.message).toEqual("Invalid Email/Password")

                done()
            }
        })
    })
    // Case empty Email & Password
    it("should return response with status code 401", function(done) {
        // setup
        const body = {
            email: "",
            password: "",
        }
        // execute
        request(app)
        .post("/login")
        .send(body)
        .end(function(err, res){
            if(err) {
                done(err)
            } else {
                // assert
                // console.log({res})
                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual("object")
                expect(res.body).toHaveProperty("message")
                expect(typeof res.body.message).toEqual("string")
                expect(res.body.message).toEqual("Invalid Email/Password")

                done()
            }
        })
    })

})