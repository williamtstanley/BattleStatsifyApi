const path = require('path');
const request = require('request');
const controller = require('../module/controller');
const config = require('../config/default');

//TODO dynamic generation of routes so that adding route objects to the
//config is the only place you have to update the code

module.exports = {
	'/': {
		'get': (req, res) => res.sendFile(path.resolve(__dirname, '../static/index.html')),
	},
  '/recentMatchData/:summonerName': {
    'get': controller.getSummonerData
  },
  [config.services.summoner.routes.summoner]: {
    'get': (req, res) =>  request({  
      url: `${config.services.summoner.host}/${req.params.summonerName}`,
      method: req.query.method
    }).pipe(res),
  },
  [config.services.matches.routes.recent]: {
    'get': (req, res) =>  request({  
      url: `${config.services.matches.host}/recent/${req.params.accountId}`,
      method: req.query.method
    }).pipe(res) 
  },
  [config.services.matches.routes.timelines]: {
    'get': (req, res) =>  request({  
      url: `${config.services.matches.host}/timelines/${req.params.matchId}`,
      method: req.query.method
    }).pipe(res)
  }
};
