const mongoose = require('mongoose'),
validator = require('node-mongoose-validator');
const uniqueValidator = require('mongoose-unique-validator');
const {APOLLO_PRODUCTION_DATABASE, APOLLO_TEST_DATABASE} = require('../test/config');
mongoose.Promise = global.Promise;

function validEmailCheck(email){
    const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const valid = emailReg.test(email);
    if(valid){
        return true;
    } else {
        return false;
    }
}
const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        unique: true,
        required: true,
    },
    password: { 
        type: String,
        required: true,
    },
    email: {
        type: String,
        validate: {
          validator: validEmailCheck,
          message: '{VALUE} is not a valid email!'
        },
        required: [true, 'Email is required']
      }
    });
//need to validate name and username display name can have spaces username no spaces and no special charcters,
//find middleware to validate js to take username and make it http friendly 
const User = mongoose.model('User', userSchema);
console.log('current enviorment', process.env.NODE_ENV);
if(process.env.NODE_ENV === 'production'){
    mongoose.connect(APOLLO_PRODUCTION_DATABASE);
} else {
    console.log('using', APOLLO_TEST_DATABASE);
    mongoose.connect('mongodb://localhost/apollo');
}



userSchema.plugin(uniqueValidator);

module.exports = {User, validEmailCheck};