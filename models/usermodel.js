const mongoose = require('mongoose'),
validator = require('node-mongoose-validator');
const bcrypt = require('bcrypt-nodejs')
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
  local : {
      email: String,
      password: String
  }
});
//need to validate name and username display name can have spaces username no spaces and no special charcters,
//find middleware to validate js to take username and make it http friendly 
// console.log('current enviorment', process.env.NODE_ENV);
// if(process.env.NODE_ENV === 'production'){
//     mongoose.connect(APOLLO_PRODUCTION_DATABASE);
//     console.log('using', APOLLO_PRODUCTION_DATABASE);
// } else {
//     console.log('using', APOLLO_TEST_DATABASE);
//     mongoose.createConnection(APOLLO_TEST_DATABASE);
// }

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};
userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);


module.exports = User;