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
// mongoose.connect('mongodb://root:root@ds111529.mlab.com:11529/apollo');
 mongoose.createConnection('mongodb://localhost/apollotestdb');
module.exports = {Workout};
