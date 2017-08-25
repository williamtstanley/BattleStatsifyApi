const mongoose = require('mongoose');
const config = require('../../config/config');

const itemSchema = mongoose.Schema({
  plaintext: String,
  description: String,
  id: Number,
  name: String,
  createdAt: { type: Date, default: Date.now, expires: config.staticExpiry }
});

module.exports = mongoose.model('Item', itemSchema);
