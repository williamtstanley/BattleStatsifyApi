const app = require('express')();
const Router = require('./routing/router');
const routes = new Router(app);

app.listen(3001, function() {
	console.log('GatewayService started listening on:', this.address().port)
})
