const app = require('express')();
const Router = require('./routing/router');
const MongooseDB = require('../databaseHelpers/mongoDB');
const config = require('./config/default')
const goosedb = new MongooseDB(config);
const routes = new Router(app);

goosedb.connect()

app.listen(3003, function() {
	console.log('MatchService started listening on:', this.address().port)
})


