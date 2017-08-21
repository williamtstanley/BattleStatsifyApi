const mongoose = require('mongoose');

const schema = mongoose.Schema({
  accountData: {
    profileIconId: Number,
    name: String,
    summonerLevel: Number,
    accountId: Number,
    id: Number,
    revisionDate: Number,
  },
	createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

schema.pre('save', function (next) {
	this.updatedAt = new Date();
	next();
});

module.exports = mongoose.model('Summoner', schema);
