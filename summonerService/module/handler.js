const when = require('when');
const Model = require('./model');
const config = require('../config/default')
const Repository = require('../../databaseHelpers/repository');
const RiotAPI = require('../../riotAPI/riotAPI');
const riotClient = new RiotAPI(config.riotApi.apiKey)
const summonerRepo = new Repository(Model);


const getSummonerByName = (params) => {
  const { summonerName } = params
  return summonerRepo.findOne({ name: summonerName }).then((summonerData) => {
    if (summonerData) {
      console.log('found in our database')
      return summonerData;
    } else {
      return riotClient.getSummonerByName(summonerName)
        .then((response) => {
          console.log('found via riotAPI and created entry')
          return summonerRepo.create(JSON.parse(response)).then((newRecord) => newRecord)
        })
        .catch((err) => {
          console.log('No summoner found via api')
          return err
        })
    }
  });
}

module.exports = {
  getSummonerByName,
}
