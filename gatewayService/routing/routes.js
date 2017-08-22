const path = require('path');
const request = require('request');
const controller = require('../module/controller');
const config = require('../config/default');

module.exports = {
	'/': {
		'get': (req, res) => res.sendFile(path.resolve(__dirname, '../static/index.html')),
	},
  '/summonerData/:summonerName': {
    'get': controller.getSummonerData
  },
  [config.serviceRoutes.summoner]: {
    'get': (req, res) =>  request({  
        url: `${config.serviceHosts.summoner}/${req.params.summonerName}`,
        method: req.query.method
      }).pipe(res),
  },
  [config.serviceRoutes.matches]: {
    'get': (req, res) =>  request({  
        url: `${config.serviceHosts.matches}/${req.params.accountId}`,
        method: req.query.method
      }).pipe(res) 
  }
};
