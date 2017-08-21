const mongoose = require('mongoose');
const config = require('./config/default')

class MongoDB {
  constructor() {
    this._mongoose = mongoose;
    this.databaseurl = config.databaseDSN[[process.env.NODE_ENV || 'development']]
  }
  
  get mongoose() {
    return this._mongoose;
  }
  
  connect() {
    this._mongoose.connect(this.databaseurl);
    this.db = this._mongoose.connection;
    this.db.on('open', () => console.log(`Connected to database: ${this.databaseurl}`))
    this.db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  }

}

module.exports = MongoDB;
