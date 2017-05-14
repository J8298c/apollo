const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

module.exports = Workout;
