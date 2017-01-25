const mongoose = require('mongoose'),
validator = require('node-mongoose-validator');
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
        unique: true,
        validate: validator.$isEmail({msg: 'Please provide proper email'})
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
userSchema.plugin(uniqueValidator);
module.exports = {User};