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




