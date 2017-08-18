const app = require('express')();
const Routes = require('./routing/routes');
const routes = new Routes(app);

app.listen(3000, function() {
	console.log('EntryService started listening on:', this.address().port)
})
