`npm install`

If you don't have pm2 installed do: `npm install -g pm2`

Then to start the services run `npm run start:dev`

You will need an active dev api key which lives in the riotApi config file at the moment.
For production use process.env for setting api key securely.

## DO NOT PUSH PRODUCTION KEYS TO REPO
