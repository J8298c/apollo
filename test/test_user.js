const mongoose = require('mongoose');
const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const faker = require('faker');
const should = chai.should();
 const {APOLLO_TEST_DATABASE, PORT} = require('../test/config');

const User = require('../models/usermodel');
const app = express();
const assert = require('assert');

chai.use(chaiHttp);
mongoose.Promise = global.Promise;

//============================================//
/* Hook functions for testing */

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


// after each endpoint test erase DB to start fresh
function eraseDB() {
  return new Promise((resolve, reject) => {
    console.warn('Deleting database');
    mongoose.connection.dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err))
  });
}
let server;
function runServer(databaseUrl=APOLLO_TEST_DATABASE, port=PORT) {
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

//================================================//
/* testing */

describe('Testing API Endpoints', function(){
      before(function() {
      return runServer(APOLLO_TEST_DATABASE);
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
    return count;
  })
  let res;
  chai.request(app)
  .post('/users/register', {username: faker.name.firstName(), email: faker.hacker.verb(), password: faker.lorem.word()})
  .then(_res => {
    res = _res;
    res.should.have.status(406)
    assert.equal(count, 6);
    })
  })
    it('should save a user to the db when all values are correct', function(){
    //counting number of users in DB which should be 0
     let res;
     chai.request(app)
     .post('/users/register', {name: faker.name.firstName(), email:faker.internet.email(), password: faker.commerce.product()})
     .then(_res =>{
       res = _res;
       res.should.have.status(200);
       res.should.be.json;
       res.should.be.a('object');
       res.should.include.keys('name', 'email', 'password');
       assert.equal(count, 7);
       })
     })
  });
    describe('USER PUT request',()=> {
      it('should add new user to db', ()=>{
        let res;
        chai.request(app)
        .post('/users/register', {name: 'juan', email: faker.internet.email(), password: faker.commerce.price()})
      })
      it('should find user that was just created and updating email and passwrd field', ()=>{
        chai.request(app)
        .put('/users/:name/edit', {name: 'juan', email: faker.internet.email(), password: faker.hacker.adjective()})
        .then(_res => {
          res.should.have.status(204);
          res.should.be.json;
          res.should.be.a('object');
        })
        console.log('updated');
        return chai.request(app)
      })
    })
    describe('USER DELETE request', () =>{
      it('should add new user to the db for test', ()=>{
        let res;
        chai.request(app)
        .post('/users/register', {name: 'deleteMe', email: faker.internet.email(), password: faker.commerce.price()})
        // .then(_res =>{
        //   res = _res;
        //   res.should.have.status(200);
        //   res.should.be.json;
        //   res.should.be.a('object');
        //   res.should.include.keys('name', 'email', 'password');
        //   assert.equal(count, 7);
        // })
        it('should find newly created user and delete from DB', ()=>{
          let res;
          chai.request(app)
          .delete('/users/:name/remove', {name: 'deleteMe'})
          .then(_res =>{
            res = _res;
            res.should.have.status(200);
            assert.equal(count, 6)
          })
          console.log('deleted');
        })
      })
    })
});

