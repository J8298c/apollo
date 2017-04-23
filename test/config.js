
exports.APOLLO_PRODUCTION_DATABASE = process.env.APOLLO_PRODUCTION_DATABASE ||
                       global.DATABASE_URL;
                      
exports.APOLLO_TEST_DATABASE = 
	        'mongodb://root:root@ds115701.mlab.com:15701/apollotest';
exports.PORT = process.env.PORT || 8080;