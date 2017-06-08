const mongoose = require('mongoose');
const mocha = require('mocha');
const chai = require('chai');
const express = require('express');
const assert = require('assert');
const User = require('../models/usermodel');
const faker = require('faker');

const port = process.env.PORT || 8081;
const testDB = 'mongodb://localhost/apollotesting';
const should = chai.should();
const app = express();

//hooks

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
})