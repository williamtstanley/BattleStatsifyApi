const bodyParser = require('body-parser');
const routes = require('./routes');

class Router {
	constructor(app) {
		this.app = app;
		if (!this.app) throw new Error('Missing app property');

		this.routes = routes;
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(bodyParser.json());

		this.registerRoutes();

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
