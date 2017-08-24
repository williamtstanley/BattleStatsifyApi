const when = require('when');
const Model = require('./model');
const config = require('../config/default')
const Repository = require('../../databaseHelpers/repository');
const RiotAPI = require('../../riotAPI/riotAPI');
const riotClient = new RiotAPI()
const summonerRepo = new Repository(Model);


const getSummonerByName = (params) => {
  const { summonerName } = params;
  return summonerRepo.findOne({ name: summonerName }).then((summonerData) => {
    if (summonerData) {
      console.log('found summoner in our database');
      return summonerData;
    } else {
      return riotClient.getSummonerByName(summonerName)
        .then((response) => {
          console.log('found summoner via api')
          let parsedSummoner = JSON.parse(response);
          return riotClient.getLeaguePositionBySummoner(parsedSummoner.id)
            .then((leagueJson) => {
              console.log('found league data via api => creating entry')
              return summonerRepo.create(Object.assign({}, parsedSummoner, {
                leagueStat: JSON.parse(leagueJson), 
              })).then((newEntry) => newEntry)
            }).catch((err) => {
              console.log('no league data found createing summoner without')
              return summonerRepo.create(parsedSummoner).then((newEntry) => newEntry)
            })
        })
        .catch((err) => {
          console.log('No summoner found via api');
          throw new Error(err);
        })
    }
  });
}

module.exports = {
  getSummonerByName,
}
