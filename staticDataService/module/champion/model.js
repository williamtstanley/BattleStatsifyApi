const mongoose = require('mongoose');
const config = require('../../config/config');

const championSchema = mongoose.Schema({
  title: String,
  name: String,
  key: String,
  id: Number,
  createdAt: { type: Date, default: Date.now, expires: config.staticExpiry }
});

module.exports = mongoose.model('Champion', championSchema);
