const path = require('path');
const request = require('request');

module.exports = {
	'/': {
		'get': (req, res) => res.sendFile(path.resolve(__dirname, '../static/index.html')),
	},
  '/api/summoner/:summonerName': {
    'get': (req, res) =>  request({  
        url: `http://localhost:3002/${req.params.summonerName}`,
        method: req.query.method
      }).pipe(res),
  }
};
