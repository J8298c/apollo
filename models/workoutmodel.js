const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    reps: {
        type: Number,
        required: true,
    },
    sets: {
        type: Number,
        required: true
    }
});

const workoutPlaylist = new Schema({
    title: {
        type: String,
        required: true
    },
    workouts: [workoutSchema]
});

const Workout = mongoose.model('Workout', workoutSchema);
const HeroWod = mongoose.model('HeroWod', workoutPlaylist);
module.exports ={ Workout, HeroWod};