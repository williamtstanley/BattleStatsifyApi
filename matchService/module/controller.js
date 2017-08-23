const handler = require('./handler');

module.exports = {
	getRecentMatches: (req, res, next) => {
		handler.getRecentMatches(req.params)
			.then((response) => {
				res.status(200).send(response);
				next();
			})
			.catch((err) => {
				next(err);
			});
	},
  getMatchTimeline: (req, res, next) => {
    handler.getMatchTimeline(req.params)
			.then((response) => {
				res.status(200).send(response);
				next();
			})
			.catch((err) => {
				next(err);
			});
  }
};
