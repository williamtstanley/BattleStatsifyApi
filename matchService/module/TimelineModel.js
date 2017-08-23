const mongoose = require('mongoose');

const schema = mongoose.Schema({
  matchId: Number,
  frames: [],
  frameInterval: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Timeline', schema);
