const app = require('express')();
const Router = require('./routing/router');
const routes = new Router(app);

app.listen(3000, function() {
	console.log('EntryService started listening on:', this.address().port)
})
