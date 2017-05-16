const mongoose = require('mongoose');
const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const faker = require('faker');
const should = chai.should();
const {APOLLO_TEST_DATABASE, PORT} = require('../test/config');
const {Workout} = require('../models/workoutmodel');
const app = express();
const assert = require('assert');

chai.use(chaiHttp);
mongoose.Promise = global.Promise;

//============================================//
/* Hook functions for testing */


function seedData(){
 
 let name = faker.company.companyName();
 let equipment = faker.commerce.product();
 let bodyParts = [faker.commerce.product(), faker.hacker.noun()];
 let seededWorkouts = [];
 for(var i = 0; i < 4; i++){
   seededWorkouts.push({
     name: name,
     equipment: equipment,
     bodyParts: bodyParts
   });
 }
 console.log(seededWorkouts);
 Workout.insertMany(seededWorkouts);
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
  
  describe('WORKOUT GET Request', function(){
    it('should return a list of workouts in DB', function(){
      let res;
      return chai.request(app);
      return Workout.count();
    });
  })
  describe('WORKOUT POST request', function(){
    it('should save a Workout to the DB', function(){
     let res;
     chai.request(app)
     .post('/workout/create', {name: faker.name.firstName(), equipment:faker.company.bsNoun(), bodyParts: [faker.commerce.product(), faker.commerce.product()]})
     .then(_res =>{
       res = _res;
       res.should.have.status(200);
       res.should.be.json;
       res.should.be.a('object');
       res.should.include.keys('name', 'equipment', 'bodyParts');
       assert.equal(count, 5);
       })
     })
  });
    describe('WORKOUT PUT request',()=> {
      it('should add new workout to db', ()=>{
        let res;
        chai.request(app)
        .post('/workout/create', {name: 'chicken_wing', equipment:faker.company.bsNoun(), bodyParts: [faker.commerce.product(), faker.commerce.product()]})
      })
      it('should find workout that was just created and updating equipment and bodyParts field', ()=>{
        chai.request(app)
        .put('/workout/:workoutname/update', {name: 'chicken_wing', equipment:faker.company.bsNoun(), bodyParts: [faker.commerce.product(), faker.commerce.product()]})
        .then(_res => {
          res.should.have.status(204);
          res.should.be.json;
          res.should.be.a('object');
        })
        console.log('updated');
        return chai.request(app)
      })
    })
    describe('WORKOUT DELETE request', () =>{
      it('should add new workout to the db for test', ()=>{
        let res;
        chai.request(app)
        .post('/workout/create', {name: 'deleteMe', equipment:faker.company.bsNoun(), bodyParts: [faker.commerce.product(), faker.commerce.product()]})

        it('should find newly created workout and delete from DB', ()=>{
          let res;
          chai.request(app)
          .delete('/workout/:workoutname/remove', {name: 'deleteMe'})
          .then(_res =>{
            res = _res;
            res.should.have.status(200);
            assert.equal(count, 4)
          })
          console.log('deleted');
        })
      })
    })
});