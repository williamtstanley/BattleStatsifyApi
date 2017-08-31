const app = require('express')();
const path = require('path');
const controller = require('./module/controller');
const bodyParser = require('body-parser');
const MongooseDB = require('../databaseHelpers/mongoDB');
const config = require('./config/default')
const goosedb = new MongooseDB(config);

goosedb.connect()
//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//routes
app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, './static/index.html')));
app.get('/:summonerName', controller.getItem);

app.listen(3002, function() {
	console.log('SummonerService started listening on:', this.address().port)
})


