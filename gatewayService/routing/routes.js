const path = require('path');
const request = require('request');
const controller = require('../module/controller');
const config = require('../config/default');

module.exports = {
	'/': {
		'get': (req, res) => res.sendFile(path.resolve(__dirname, '../static/index.html')),
	},
  '/recentMatchData/:summonerName': {
    'get': controller.getSummonerData
  },
};
