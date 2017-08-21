const mongoose = require('mongoose');
const config = require('../config/config');

const schema = mongoose.Schema({
  profileIconId: Number,
  name: { type: String, lowercase: true, trim: true },
  summonerLevel: Number,
  accountId: Number,
  id: Number,
  revisionDate: Number,
  createdAt: { type: Date, default: Date.now, expires: config.summonerExpiry }
});

module.exports = mongoose.model('Summoner', schema);
