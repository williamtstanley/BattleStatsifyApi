const bodyParser = require('body-parser');
const request = require('request');
const services = require('../config/default').services;
const reqAPIAuthorizer = require('../middleware/reqAPIAuthorizer');
// const routeNotFound = require('../middleware/routeNotFound');
const allowCors = require('../middleware/allowCors');

class Router {
	constructor(app) {
		this.app = app;
		if (!this.app) throw new Error('Missing app property');

    this.services = services;
    
    this.app.use(allowCors);
    // this.app.use(reqAPIAuthorizer);
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(bodyParser.json());

    this.registerServices();
        
    this.app.use(function (err, req, res, next) {
      console.error(err.stack)
      res.status(500).send('Something broke!')
    })
	}

  registerServices() {
    Object.keys(this.services).forEach((service) => {
      this.app.use(service, (req, res, next) => request({
        url: `${this.services[service].host}${req.url}`,
        method: req.query.method
      }).pipe(res))
    });
  }
	
}

module.exports = Router;
