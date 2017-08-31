const app = require('express')();
const path = require('path');
const bodyParser = require('body-parser');
const MongooseDB = require('../databaseHelpers/mongoDB');
const config = require('./config/default')
const goosedb = new MongooseDB(config);
const controller = require('./module/controller');

goosedb.connect()
//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//routes
app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, './static/index.html')));
app.get('/recent/:accountId', controller.getRecentMatches);
app.get('/timelines/:matchId', controller.getMatchTimeline);

app.listen(3003, function() {
	console.log('MatchService started listening on:', this.address().port)
})


