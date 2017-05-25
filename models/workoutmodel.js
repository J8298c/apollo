const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    workout:[{
        name: {
            type: String,
            required: true
        },
        reps: {
            type: String,
            required: true
        },
        sets: {
            type: String,
            required: true
        },
    }]
});

const Workout = mongoose.model('Workout', workoutSchema);