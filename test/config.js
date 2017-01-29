exports.TEST_DATABASE_URL = (
	process.env.TEST_DATABASE_URL ||
	'mongodb://localhost/testDB');
exports.PORT = process.env.PORT || 8080;