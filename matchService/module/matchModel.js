const mongoose = require('mongoose');
const config = require('../config/config');

const schema = mongoose.Schema({
  accountId: Number,
  match: {},
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Match', schema);
