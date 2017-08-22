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
    this.app.use((err, req, res, next) => {
      console.log('there was an error', err)
      res.status(err.status || 500);
      res.json({
          message: err.message,
          error: err
      });
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
