const app = require('express')();
const Router = require('./routing/router');
const routes = new Router(app);

app.listen(3002, function() {
	console.log('SummonerService started listening on:', this.address().port)
})
