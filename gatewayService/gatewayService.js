const app = require('express')();
const path = require('path');
const controller = require('./module/controller');
const Router = require('./routing/router');
const routes = new Router(app);

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, './static/index.html')));
app.get('/recentMatchData/:summonerName', controller.getSummonerData)

app.listen(3001, function() {
	console.log('GatewayService started listening on:', this.address().port)
})
