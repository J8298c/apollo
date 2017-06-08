const mongoose = require('mongoose');
const mocha = require('mocha');
const chai = require('chai');
const express = require('express');
const should = chai.should();
const app = express();
const assert = require('assert');
const User = require('../models/usermodel');


function seedData(){
    let email = 'craigs@gmail.com';
    let password = 'abcd1234';
    const theUser = {
        email: email,
        password: password
    }
    User.insertMany(theUser);
}

function clearDB(){
    return new Promise((resolve, reject)=>{
        console.warn('Erasing DB');
        mongoose.connection.dropDatabase()
            .then(result => resolve(result))
            .catch(err => reject(err))
    });
}

let server;

function runServer(databaseUrl='mongodb://localhost/atest', port=8080){
    mongoose.connect(databaseUrl, err=>{
        if(err){
            return reject(err);
        }
        server = app.listen(port, ()=>{
            console.log(`running test on port ${port}`)
            resolve();
        })
        .on('error', err =>{
            mongoose.disconnect();
            reject(err);
        })
    })
}

function closeServer(){
    return mongoose.disconnect().then(()=>{
        return new Promise((resolve, reject)=>{
            console.log('closing the server');
            server.close(err =>{
                if(err){
                    return reject(err);
                }
                resolve();
            });
        });
    });
}

describe('Testing API Endpoints', ()=>{
    before(()=>{
        return runServer(databaseUrl);
    });
    beforeEach(()=>{
        return seedData();
    })
    afterEach(()=>{
        return clearDB();
    })

    after(()=>{
        return closeServer()
    })
    describe('USER GET Request', ()=>{
        it('should return a list of users in db', ()=>{
            let res;
            return chai.request(app);
            return Users.count();
        });
    })
})