const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workout = new Schema({
    name: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    reps : {
        type: Number,
        required: true
    }
});

const superHeroSchema = new Schema({
    name: String,
    workouts: [workout]
});

const Workout = new mongoose.model('Workout', workout);
const SuperHero = new mongoose.model('SuperHero', superHeroSchema);


module.exports = {Workout, SuperHero};