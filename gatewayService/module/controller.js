const handler = require('./handler');

module.exports = {
	getSummonerData: (req, res, next) => {
		handler.buildSummonerData(req.params)
			.then((response) => {
				res.status(200).send(response);
				next();
			})
			.catch((err) => {
				next(err);
			});
	},
};
