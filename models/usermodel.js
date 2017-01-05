const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: { 
        type: String,
        required: true,
    }
});

const User = mongoose.model('User', userSchema);
//need to connect to a new collection for Users 
//within local DB
// mongoose.connect('mongodb://localhost/apollo');

module.exports = {User};