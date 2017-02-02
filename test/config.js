const {testDB} = require('../models/workoutmodel');
exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                      'mongodb://localhost/apollodb';
exports.TEST_DATABASE = (
	process.env.TEST_DATABASE_URL ||
	'mongodb://localhost/apollotestdb');
exports.PORT = process.env.PORT || 8080;