const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const apolloSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bodyParts: Array,
    equipment: {
        type: String,
        required: true
    },
    createdAt: { 
        type: Date,
        required: true,
        default: new Date()
    }
});  

const Workout = mongoose.model('Workout', apolloSchema);

mongoose.createConnection('mongodb://localhost/apollo');

module.exports = {Workout};

//todo 
//fix form for body 
//implement showpage for both excersises and users
//do same for user that i have for excersises 
//rename excersises to workout
