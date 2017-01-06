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
mongoose.createConnection('mongodb://localhost/apollo');


module.exports = {User};