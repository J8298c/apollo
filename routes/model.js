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
    }
});

const Excersise = mongoose.Model('Excersise', apolloSchema);

module.exports = {Model};

mongoose.connect('mongodb://localhost/3000');

Excersise.findOne(function(error, result){
    for(let i = 0; i < results.length; i++){
        console.log(results[i]);
    }
});


