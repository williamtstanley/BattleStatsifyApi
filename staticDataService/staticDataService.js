const app = require('express')();
const path = require('path');
const bodyParser = require('body-parser');
const championController = require('./module/champion/controller');
const itemController = require('./module/item/controller');
const MongooseDB = require('../databaseHelpers/mongoDB');
const config = require('./config/default')
const goosedb = new MongooseDB(config);
//dbConnect
goosedb.connect()
//middlewar
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//routes
app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, './static/index.html')));
app.get('/champions/:championId', championController.getChampionById);
app.get('/champions', championController.getChampionList);
app.get('/items', itemController.getItemList);

app.listen(3004, function() {
	console.log('StaticDataService started listening on:', this.address().port)
})


