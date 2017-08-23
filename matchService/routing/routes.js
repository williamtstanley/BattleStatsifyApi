const path = require('path');
const controller = require('../module/controller');

module.exports = {
	'/': {
		'get': (req, res) => res.sendFile(path.resolve(__dirname, '../static/index.html')),
	},
  '/recent/:accountId': {
    'get': controller.getRecentMatches,
  },
  '/timelines/:matchId': {
    'get': controller.getMatchTimeline,
  }
};
