const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        unique: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: { 
        type: String,
        required: true,
    }
});
//need to validate name and username display name can have spaces username no spaces and no special charcters,
//find middleware to validate js to take username and make it http friendly 
const User = mongoose.model('User', userSchema);
mongoose.createConnection('mongodb://root:root@ds111529.mlab.com:11529/apollo');
userSchema.path('email').validate(function (email) {
   var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
   return emailRegex.test(email.text); // Assuming email has a text attribute
}, 'The e-mail field cannot be empty.')
userSchema.plugin(uniqueValidator);
module.exports = {User};