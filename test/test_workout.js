const mongoose = require('mongoose');
const mocha = require('mocha');
const chai = require('chai');
const express = require('express');
const assert = require('assert');
const {Workout}= require('../models/workoutmodel');
const faker = require('faker');
const chaiHttp = require('chai-http');
const port = process.env.PORT || 8081;
const testDB = 'mongodb://localhost/apollotesting';
const should = chai.should();
const app = express();
chai.use(chaiHttp);

function seedData(){
    let name = faker.commerce.color();
    let reps = faker.random.number();
    let sets = faker.random.number();
    let seedWorkouts = [];

    for(let i = 0; i < 4; i++){
        seedWorkouts.push({
            name: name,
            reps: reps,
            sets: sets
        })
    }
    Workout.insertMany(seedWorkouts);
}

let server;
function runServer(databaseUrl, port){
    return new Promise((resolve, reject)=>{
        mongoose.connect(databaseUrl, err =>{
            if(err){
                return reject(err);
            }
            server = app.listen(port, ()=>{
                console.log(`app is listening on port ${port}`);
                resolve();
            })
            .on('error', err =>{
                mongoose.disconnect();
                reject(err);
            })
        })
    })
}

function eraseDB(){
    return new Promise((resolve, reject)=>{
        console.warn('Deleting database');
        mongoose.connection.dropDatabase()
            .then(result => resolve(result))
            .catch(err => reject(err))
    });
}

function closeServer(){
    return mongoose.disconnect()
        .then(()=>{
            return new Promise((resolve, reject)=>{
                console.log('closing server');
                server.close(err =>{
                    if(err){
                        return reject(err);
                    }
                    resolve();
                });
            });
        });
}

describe('Testing workout endpoints', ()=>{
    before(()=>{
        return runServer(testDB);
    });
    beforeEach(()=>{
        return seedData();
    });
    afterEach(()=>{
        return eraseDB();
    })
    after(()=>{
        closeServer();
    })
    describe('Workout get request', ()=>{
        it('should return a list of workouts in DB', ()=>{
            let res;
            return Workout.count();
        })
    })
    describe('Workout Post request', ()=>{
        it('should save a workout to the DB', ()=>{
            let res;
            chai.request(app)
                .post('/create', {name : faker.commerce.color(), reps: faker.random.number(), sets: faker.random.number()})
                .then(_res =>{
                    res = _res;
                    res.should.have.status(200);
                    res.should.be.json;
                    res.should.be.a('object');
                    res.should.include.keys('name', 'reps', 'sets');
                    assert.equal(count, 5);
                })
        })
    })
    describe('Workout Put request', ()=>{
        it('should add new workout to db for testing', ()=>{
            let res;
            chai.request(app)
                .post('/create', {name : 'benchpress', reps: faker.random.number(), sets: faker.random.number()})
        })
        it('should find created workout and edit reps field', ()=>{
            chai.request(app)
            .put('/edit/:name', {name: 'benchpress', reps: 210, sets: faker.random.number()})
            .then(_res=>{
                res.should.have.status(204);
                res.should.json;
                res.should.be.a('object');
            })
            return chai.request(app);
        })
    })
    describe('Workout Delete request', ()=>{
        it('should add new workout to the db for test', ()=>{
            let res;
            chai.request(app)
            .post('/create', {name : 'benchpress', reps: faker.random.number(), sets: faker.random.number()})
        })
        it('should find recently created and delete it', ()=>{
            let res;
            chai.request(app)
            .delete('/delete', {name: 'benchpress'})
            .then(_res =>{
                res = _res;
                res.should.have.status(200);
                assert.equal(count, 4)
            })
            console.log('workout deleted');
        })
    })
})