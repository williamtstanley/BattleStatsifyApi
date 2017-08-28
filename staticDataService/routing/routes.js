const path = require('path');
const championController = require('../module/champion/controller');
const itemController = require('../module/item/controller');

module.exports = {
	'/': {
		'get': (req, res) => res.sendFile(path.resolve(__dirname, '../static/index.html')),
	},
  '/champions/:championId': {
    'get': championController.getChampionById,
  },
  '/champions': {
    'get': championController.getChampionList,
  },
  '/items': {
    'get': itemController.getItemList,
  }
};
