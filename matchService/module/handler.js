const when = require('when');
const RecentMatches = require('./model');
const config = require('../config/default')
const Repository = require('../../databaseHelpers/repository');
const RiotAPI = require('../../riotAPI/riotAPI');
const riotClient = new RiotAPI(config.riotApi.apiKey)
const RecentMatchRepo = new Repository(RecentMatches);

const getRecentMatches = (params) => {
  const { accountId } = params;
  return RecentMatchRepo.findOne({ accountId: accountId }).then((matchData) => {
    if (matchData) {
      return matchData
    } else {
      return riotClient.getRecentMatches(accountId)
        .then((response) => {
          console.log('found matches via riotAPI and created entry');
          return RecentMatchRepo.create(
            Object.assign(
              {},
              JSON.parse(response), 
              { accountId }
            )).then((newRecord) => newRecord);
        })
        .catch((err) => {
          console.log('no match data found for accountId');
          throw new Error(err)
        })
    }
  })
}

module.exports = {
  getRecentMatches,
}
