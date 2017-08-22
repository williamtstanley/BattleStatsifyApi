const mongoose = require('mongoose');
const config = require('../config/config');

const leagueStatSchema = mongoose.Schema({
  hotStreak: Boolean,
	freshBlood: Boolean,
	inactive: Boolean,
	veteran: Boolean,
	losses: Number,
	wins: Number,
	leaguePoints: Number,
	playerOrTeamName: String,
	playerOrTeamId: String,
	rank: String,
	queueType: String,
	tier: String,
	leagueName: String,
})

const summonerSchema = mongoose.Schema({
  profileIconId: Number,
  name: { type: String, lowercase: true, trim: true },
  summonerLevel: Number,
  accountId: Number,
  id: Number,
  revisionDate: Number,
  leagueStat: [leagueStatSchema],
  createdAt: { type: Date, default: Date.now, expires: config.summonerExpiry }
});

module.exports = mongoose.model('Summoner', summonerSchema);
