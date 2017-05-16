exports.APOLLO_PRODUCTION_DATABASE = process.env.APOLLO_PRODUCTION_DATABASE ||
                       global.DATABASE_URL;
                      
exports.APOLLO_TEST_DATABASE = 
	        process.env.APOLLO_TEST_DATABASE;
exports.PORT = process.env.PORT || 8080;