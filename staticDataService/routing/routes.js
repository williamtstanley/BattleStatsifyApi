const path = require('path');
const controller = require('../module/champion/controller');

module.exports = {
	'/': {
		'get': (req, res) => res.sendFile(path.resolve(__dirname, '../static/index.html')),
	},
  '/champion/:championId': {
    'get': controller.getChampionById,
  },
  '/champion': {
    'get': controller.getChampionList,
  }
};
