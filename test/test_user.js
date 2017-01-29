process.env.NODE_ENV = 'test';
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const chai = require('chai');
const chaiHttp = require('chai-http');
const {User} = require('../models/usermodel');
const should = chai.should();
const faker = require('faker');
const router = express()
router.use(bodyParser.json());
chai.use(chaiHttp);
const {closeServer, runServer} = require('../app');
const {TEST_DATABASE_URL, PORT} = require('./config');

mongoose.Promise = global.Promise;

function freshStart() {
    return new Promise((resolve, reject)=>{
        console.warn('deleting DB');
        mongoose.connection.dropDatabase()
        .then(result=>resolve(result))
        .catch(err => reject(err))
    });
}
//faker data to seed to test DB
function feedData(){
let firstName = faker.name.findName();
let lastName = faker.name.findName();
const fullName = firstName+lastName;
const userEmail = faker.internet.email();
let password = faker.hacker.verb();

const userData = [];
for(let i = 1; i<=4; i++){
    userData.push({
        name: fullname,
        email: userEmail,
        password: password
    });
}
return User.insertMany(userData);
}




describe('User', function(){
    before(function(){
        return runServer(TEST_DATABASE_URL);
    });
    beforeEach(function(){
        return feedData();
    });
    afterEach(function(){
        return freshStart();
    });
    after(function(){
        return closeServer();
    });

    describe('GET endpoint', function(){
        it('should return all existing users', function(){
            let res;
            return chai.request(router)
            .get('/users')
            .then(_res => {
                res = _res;
                res.should.have.statuse(200);
                //if didnt have statuse 200 feedData() didnt work
                res.body.should.have.length.of.at.least(1);

                return User.count();
            })
            .then(count => {
                res.body.should.have.length.of(count);
            });
        });
        it('should return users with correct fields', function(){
            let resUser;
            return chai.request(router)
            .get('/users')
            .then(function(res){
                res.should.have.status(200);
                res.should.be.json;
                res.should.be.a('array');
                res.body.should.have.length.of.at.least(1);

                res.body.forEach(function(user){
                    user.should.be.a('object');
                    user.should.include.keys('name', 'email', 'password');
                });
                resUser = res.body[0];
                return User.findOne(resPost.name).exec();
            })
            .then(user => {
                resUser.name.should.equal(user.name);
                resUser.email.should.equal(user.email);
                resUser.password.should.equal(user.password);
            });
        });
    });
});

// describe('POST endpoint', function(){
//     it('should add a new user', function(){
//         let name = 'larry'
//         let email = 'benjamins@benji.com'
//         let password = '12345benji'
//         const createdUser = [{
//             name: name,
//             email: email,
//             password: password
//         }]
//     });
//     return chai.request(router)
//     .post('/users')
//     .send(createdUser)
//     .then(function(res){
//         res.should.have.status(201);
//         res.should.be.json;
//         res.body.should.be.a('object');
//         res.body.should.include.keys(
//             'name', 'email', 'password'
//         )
//         res.body.name.should.equal(newUser.name);
//         res.body.email.should.equal(newUser.email);
//         res.body.password.should.equal(newUser.password);
//         return User.findOne(res.body.name).exec();
//     })
//     .then(function(user) {
//         user.name.should.equal(newUser.name);
//         user.email.should.equal(newUser.email);
//         user.password.should.equal(newUser.password);
//     })
// });

// describe('PUT endpoint', function(){
//     it('should update information we send to DB', function(){
//         const updateUser = {
//             name: 'HenryCollin',
//             email: 'henry@kicks.com',
//             password: 'Henry123'
//         }
//         return User
//         .findOne()
//         .exec()
//         .then(post => {
//             updateUser.name = user.name;
//             return chai.request(router)
//             .put(`/users/${user.name}`)
//             .send(updateUser);
//         })
//         .then(res => {
//             res.should.have.status(201);
//             res.should.be.json;
//             res.body.should.be.a('object');
//             res.body.name.should.be.equal(updateUser.name);
//             res.body.email.should.equal(updateUser.email);
//             res.body.password.should.equal(updateUser.password);

//             return User.findOne(res.body.name).exec();
//         })
//         .then(user =>{
//             user.name.should.equal(updateUser.name);
//             user.email.should.equal(updateUser.email);
//             user.password.should.equal(updateUser.password);
//         })
//     })
// });

// describe('Delete endpoint', function(){
//     it('should delete a user by name', function(){
//         let user;

//         return User
//         .findOne()
//         .exec()
//         .then(_user=>{
//             user = _user;
//             return chai.request(router).delete(`users/${user.name}`);
//         })
//         .then(_user=>{
//             should.not.exist(user);
//         });
//     });
// });

