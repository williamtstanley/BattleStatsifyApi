const path = require('path');
const request = require('request');
const controller = require('../module/controller');
const config = require('../config/default');

//TODO dynamic generation of routes so that adding route objects to the
//config is the only place you have to update the code
//TODO revisit the proxy requests as I can probably just fwd eveything from a /endpoint
//url to the service and minimize the route requirements on this side

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
  },
  [config.services.static.routes.champions]: {
    'get': (req, res) => request({
      url: `${config.services.static.host}/champion`,
      method: req.query.method
    }).pipe(res)
  },
  [config.services.static.routes.champion]: {
    'get': (req, res) => request({
      url: `${config.services.static.host}/champion/${req.params.championId}`,
      method: req.query.method
    }).pipe(res)
  }
};
