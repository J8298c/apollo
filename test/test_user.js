const mongoose = require('mongoose');
const mocha = require('mocha');
const chai = require('chai');
const express = require('express');
const assert = require('assert');
const User = require('../models/usermodel');
const faker = require('faker');
const chaiHttp = require('chai-http');
const port = process.env.PORT || 8081;
const testDB = 'mongodb://localhost/apollotesting';
const should = chai.should();
const app = express();
chai.use(chaiHttp);
//hook

//give the database users to use for testing
function seedData(){
    let email = faker.internet.email();
    let password = faker.lorem.word();
    let seededUsers = [];

    for(let i = 0; i < 4; i++){
        seededUsers.push({
            email: email,
            password: password
        });
    }
    User.insertMany(seededUsers);
}

//setting up the server
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


//api test //

describe('Testing Api endpoints', ()=>{
    before(()=>{
        return runServer(testDB, port);
    });
    beforeEach(()=>{
        return seedData();
    });
    afterEach(()=>{
        return eraseDB();
    });
    after(()=>{
        return closeServer();
    });

    describe('User get request', ()=>{
        it('should return all users in the DB', ()=>{
            return User.count();
        });
    })
    describe('User POST request', ()=>{
        it('should reject a user saving to db when value is incorrect', ()=>{
            User.count({}, (err, count)=>{
                return count;
            })
            let res;
            chai.request('http://localhost:8081')
                .post('/signup', {email: faker.name.findName(), password: faker.lorem.word()})
                .then(_res =>{
                    res = _res;
                    res.should.have.status(406)
                    assert.equal(count, 4);
                })
        })
        it('should save the user when values are correct', ()=>{
            let res;
            chai.request(app)
            .post('/signup', {email: faker.internet.email(), password: faker.lorem.word()})
            .then(_res =>{
                res=_res;
                res.should.have.status(200);
                res.should.be.json;
                res.should.be.a('object');
                res.should.include.keys('email', 'password');
                assert.equal(count, 5);
            })
        })
    });
    describe('User PUT request', ()=>{
        it('should add new user to the DB for put test', ()=>{
            let res;
            chai.request(app)
            .post('/signup', {email: 'heman@gmail.com', password: faker.lorem.word()})
        })
        it('should find created user and edit the password', ()=>{
            chai.request(app)
            .put('/edit', {name: 'heman@gmail.com', password: faker.name.lastName()})
            .then(_res=>{
                res.should.have.status(204);
                res.should.be.json;
                res.should.be.a('object');
            })
            console.log('updated');
            return chai.request(app)
        })
    })
    describe('user Delete request', ()=>{
        it('should add new user to db for test', ()=>{
            let res;
            chai.request(app)
            .post('/signup', {email: 'deleteme@gmail.com', password: faker.lorem.word()})
            .then(_res =>{
                res = _res;
                res.should.have.status(200);
                res.should.be.json;
                res.should.be.a('object');
                res.should.include.keys('email', 'password');
                assert.equal(count, 5);
            })
        })
        it('should find newly created user and delete it from DB', ()=>{
            let res;
            chai.request(app)
            .delete('/delete',{email: 'deleteme@gmail.com'})
            .then(_res =>{
                res = _res;
                res.should.have.status(200);
                assert.equal(count, 4)
            })
            console.log('deleted');
        })
    })
    
});