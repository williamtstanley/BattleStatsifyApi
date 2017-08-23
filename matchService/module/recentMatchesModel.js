const mongoose = require('mongoose');
const config = require('../config/config');

const schema = mongoose.Schema({
  accountId: Number,
  totalGames: Number,
  endIndex: Number,
  startIndex: Number,
  matches: [], 
  createdAt: { type: Date, default: Date.now, expires: config.matchExpiry }
});

module.exports = mongoose.model('RecentMatchList', schema);
