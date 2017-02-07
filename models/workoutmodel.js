const mongoose = require('mongoose');
const {APOLLO_PRODUCTION_DATABASE, APOLLO_TEST_DATABASE} = require('../test/config');
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
//check how heroku deploys with test 
//to ensure it doesnt completely erase DB

if(process.env.NODE_ENV === 'production'){
    mongoose.createConnection(APOLLO_PRODUCTION_DATABASE);
} else {
    mongoose.createConnection(APOLLO_TEST_DATABASE);
}


module.exports = {Workout};
