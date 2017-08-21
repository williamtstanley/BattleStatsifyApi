const path = require('path');

module.exports = {
	'/': {
		'get': (req, res) => res.sendFile(path.resolve(__dirname, '../static/index.html')),
	},
  '/api/summoner/:summonerName': {
    'get': (req, res) => {
      res.json(req.params)
    }
  }
};
