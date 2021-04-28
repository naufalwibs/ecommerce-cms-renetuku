const app = require('../app');
const request = require('supertest');
const jwt = require('jsonwebtoken');

let access_token;
let paramsId;

describe("testing before DELETE /banners/:id, need Access Token", function() {
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

    // Case succesfullty deleted
    describe("testing DELETE /banners/:id success", function() {
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

        // Success
        it("should return response with 200", function(done) {
            // Setup
    
            // Execute
            request(app)
            .delete(`/banners/${paramsId}`)
            .set('access_token', access_token)
            .end(function(err, res) {
                if (err) {
                    // Assert
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(200)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty("message")
                    expect(typeof res.body.message).toEqual("string", "Banner deleted successfully")
                    done()
                }
            })
        })

        // Failed
        it("should return response with 404", function(done) {
            // Setup
            let notFoundId = 233141335
    
            // Execute
            request(app)
            .delete(`/banners/${notFoundId}`)
            .set('access_token', access_token)
            .end(function(err, res) {
                if (err) {
                    // Assert
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(404);
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty("message")
                    expect(typeof res.body.message).toEqual("string", "Data not found")
                    
                    done()
                }
            })
        })
    
 
    })
})