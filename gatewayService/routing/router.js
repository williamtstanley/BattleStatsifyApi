const bodyParser = require('body-parser');
const routes = require('./routes');
const reqAPIAuthorizer = require('../middleware/reqAPIAuthorizer');
const routeNotFound = require('../middleware/routeNotFound');

class Router {
	constructor(app) {
		this.app = app;
		if (!this.app) throw new Error('Missing app property');

		this.routes = routes;

    // this.app.use(reqAPIAuthorizer);
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(bodyParser.json());

		this.registerRoutes();
		this.app.use(routeNotFound);
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
