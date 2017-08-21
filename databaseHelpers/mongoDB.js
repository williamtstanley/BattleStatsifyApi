const mongoose = require('mongoose');

class MongoDB {
  constructor(config) {
    this.config = config
    this._mongoose = mongoose;
    this._mongoose.Promise = global.Promise;
    this.databaseurl = this.config.databaseDSN[[process.env.NODE_ENV || 'development']]
  }
  
  mongoose() {
    return this._mongoose;
  }
  
  connect() {
    this._mongoose.connect(this.databaseurl, {
      useMongoClient: true,
    });

    this.db = this._mongoose.connection;
    this.db.on('open', () => console.log(`Connected to database: ${this.databaseurl}`))
    this.db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  }

}

module.exports = MongoDB;
