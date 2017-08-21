module.exports = {
	'/': {
		'get': (req, res) => res.send('Hello World!'),
	},
  '/api/:summonerName': {
    'get': (req, res) => {
      res.json(req.params)
    }
  }
};
