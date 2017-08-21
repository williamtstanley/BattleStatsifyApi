const ENV = process.env.NODE_ENV;
const path = process.env.NODE_PATH;
const list = ['gatewayService', 'summonerService'];

module.exports = {
	apps: list.map((server) => ({
		name: server,
		script: `./${server}/${server}.js`,
		log_date_format: 'YYYY-MM-DD HH:mm',
		watch: (ENV === 'development') ? `./` : false,
		ignore_watch: ['node_modules', '.git'],
		// node_args: (ENV === 'development') ? '--inspect' : '',
		env: {
			'NODE_ENV': ENV,
			'NODE_PATH': path,
		},
	})),
};
