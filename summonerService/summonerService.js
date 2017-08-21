const app = require('express')();
const Router = require('./routing/router');
const MongooseDB = require('./mongoDB');
const goosedb = new MongooseDB();
const routes = new Router(app);

goosedb.connect()

app.listen(3002, function() {
	console.log('SummonerService started listening on:', this.address().port)
})


