const when = require('when');
const ChampionModel = require('./model');
const config = require('../../config/default')
const Repository = require('../../../databaseHelpers/repository');
const RiotAPI = require('../../../riotAPI/riotAPI');
const riotClient = new RiotAPI(config.riotApi.apiKey)
const ChampionRepo = new Repository(ChampionModel);


const getSummonerByName = (params) => {
  const { summonerName } = params;
  return summonerRepo.findOne({ name: summonerName }).then((summonerData) => {
    if (summonerData) {
      console.log('found in our database');
      return summonerData;
    } else {
      return riotClient.getSummonerByName(summonerName)
        .then((response) => {
          console.log('found summoner via api')
          let parsedSummoner = JSON.parse(response);
          return riotClient.getLeaguePositionBySummoner(parsedSummoner.id)
            .then((leagueJson) => {
              console.log('found league data via api => creating entry', JSON.parse(leagueJson))
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

const getChampionById = (id) => {
  return ChampionRepo.find({ id }).then((championData) => {
    if (championData) {
      console.log('found champions List in db')
      return championData;
    } else {

    }
  })
}


const getChampionList = () => {
  return ChampionRepo.find({}).then((championsData) => {
    if (championsData && championsData.length) {
      console.log('found champions List in db')
      return championsData;
    } else {
      return riotClient.getChampionList()
        .then((response) => {
          console.log('found champion list via api', response)
          const parsedData = JSON.parse(response).data;
          return when.all(
            when.map(
              Object.keys(parsedData).map((k) => parsedData[k]),
              (championData) => {
                return ChampionRepo.create(championData).then((newEntry) => newEntry)
              }
            )
          )
          //wish this was in spec Object.values()
        })
        .catch((err) => {
          console.log('No Champion List found!')
          throw new Error(err)
        })
    }
  })
}

module.exports = {
  getChampionList,
  getChampionById,
}
