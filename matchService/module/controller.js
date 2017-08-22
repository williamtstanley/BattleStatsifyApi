const handler = require('./handler');

module.exports = {
	getItem: (req, res, next) => {
		handler.getRecentMatches(req.params)
			.then((response) => {
				res.status(200).send(response);
				next();
			})
			.catch((err) => {
				next(err);
			});
	},
};
