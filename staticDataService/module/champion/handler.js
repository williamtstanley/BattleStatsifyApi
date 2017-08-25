const when = require('when');
const ChampionModel = require('./model');
const config = require('../../config/default')
const Repository = require('../../../databaseHelpers/repository');
const RiotAPI = require('../../../riotAPI/riotAPI');
const riotClient = new RiotAPI()
const ChampionRepo = new Repository(ChampionModel);

const getChampionById = (id) => {
  return ChampionRepo.findOne({ id }).then((championData) => {
    if (championData) {
      console.log('found champion in db')
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
          console.log('found champion list via api')
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
