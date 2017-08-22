const handler = require('./handler');

module.exports = {
	getItem: (req, res, next) => {
		handler.getSummonerByName(req.params)
			.then((response) => {
				res.status(200).send(response);
				next();
			})
			.catch((err) => {
				// res.status(403).send(err);
				next(err);
			});
	},
};
