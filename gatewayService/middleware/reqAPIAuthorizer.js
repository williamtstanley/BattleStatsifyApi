const path = require('path');
const config = require('../config/default');
const env = process.env.NODE_ENV || 'development';
const apiKey = config[env].apiKey;

//TODO authorized keys and applications data pulled from applicationRegistryService

module.exports = (req, res, next) => {
  if (env === 'development') {
    const authHeader = req.header('authorization');
	  if (authHeader) {
		  const decodedHeader = new Buffer(authHeader.split(' ')[1], 'base64')
			  .toString('utf8').split(':');

		  if (decodedHeader[1] === apiKey) {
			  next();
		  } else {
			  res.status(401).sendFile(path.resolve(__dirname, '../static/401unauthorized.html'));
		  }
	  } else {
			res.status(401).sendFile(path.resolve(__dirname, '../static/401unauthorized.html'));
	  }
  } else {
    //TODO handle not development here
  }
};
