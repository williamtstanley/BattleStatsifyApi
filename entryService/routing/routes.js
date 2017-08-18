// const bodyParser = require('body-parser');
// const routes = require('./routes');
// const request = require('request');

class Router {
	constructor(app) {
		this.app = app;
		if (!this.app) throw new Error('Missing app property');
		
		this.routes = this.getRoutes();
		// this.app.use(bodyParser.urlencoded({ extended: true }));
		// this.app.use(bodyParser.json());
		
		this.registerRoutes();

		//TODO figure out why the error fall through isn't working
		this.app.use((req, res, next) => {
      res.status(404)

      if (req.accepts('html')) {
        res.send('Sorry no such route');
        return;
      } 
  	  if (req.accepts('json')) {
        res.send({ error: 'Not Found' });
        return;
      } 	  
		})
	}

	getRoutes() {
		//TODO get routes dynamically from service swarm or registry
		return {
			'/': {
				'get': (req, res) => res.send('Hello World!')
			},
		};
	}

	registerRoutes() {
		Object.keys(this.routes).forEach((route) => {
			this.buildRoute(route, this.routes[route]);
		});
	}

	buildRoute(path, route) {
		Object.keys(route).forEach((verb) => {
			this.app[verb](path, route[verb]);
		})
	}
}

module.exports = Router;
