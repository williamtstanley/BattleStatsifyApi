const handler = require('./handler');

module.exports = {
	getChampionById: (req, res, next) => {
		handler.getChampionById(req.params.id)
			.then((response) => {
				res.status(200).send(response);
				next();
			})
			.catch((err) => {
				// res.status(403).send(err);
				next(err);
			});
	},
  getChampionList: (req, res, next) => {
    handler.getChampionList()
      .then((response) => {
        res.status(200).send(response);
        next();
      })
      .catch((err) => {
        next(err)
      })
  }
};
