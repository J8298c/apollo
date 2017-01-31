const mongoose = require('mongoose');
const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const faker = require('faker');
const should = chai.should();
const {TEST_DATABASE, PORT} = require('./config');
const {User} = require('../models/usermodel');
const app = express();
const assert = require('assert');

chai.use(chaiHttp);
mongoose.Promise = global.Promise;


describe('Testing API Endpoints', function(){
      before(function() {
      return runServer(TEST_DATABASE);
    });
      beforeEach(function() {
      return seedData();
    });
    afterEach(function() {
    return eraseDB();
  });

  after(function() {
    return closeServer();
  });
  
  describe('USER GET Request', function(){
    it('should return list of all users in DB', function(){
      let res;
      return chai.request(app);
      return Users.count();
    });
  })
  describe('USER POST request', function(){
    it('should reject a user saving to the db when value is incorrect', function(){
      
  //     //assertion that DB is empty
  User.count({}, function(err, count){
    assert.equal(count, 0);
  })
  let res;
  chai.request(app)
  .post('/users/register', {name: faker.name.firstName(), email: faker.hacker.verb(), password: faker.lorem.word()})
  .then(_res => {
    res = _res;
    res.should.have.status(406)
    assert.equal(count, 0);
    })
  })
    it('should save a user to the db when all values are correct', function(){
    //counting number of users in DB which should be 0
    User.count({}, function( err, count){
      assert.equal(count, 0);
       })
     let res;
     chai.request(app)
     .post('/users/register', {name: faker.name.firstName(), email:faker.internet.email(), password: faker.commerce.product()})
     .then(_res =>{
       res = _res;
       res.should.have.status(200);
       assert.equal(count, 1);
       })
     })
  })

})



//fill DB with users to use for testing
function seedData(){
  //faker info to create users
 let name = faker.name.firstName();
 let email = faker.internet.email();
 let password = faker.commerce.product();
 let seededUsers = [];
 for(var i = 0; i < 6; i++){
   seededUsers.push({
     name: name,
     email: email,
     password: password
   });
 }
 User.insertMany(seededUsers);
}


//after each endpoint test erase DB to start fresh
function eraseDB() {
  return new Promise((resolve, reject) => {
    console.warn('Deleting database');
    mongoose.connection.dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err))
  });
}
let server;
function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}
