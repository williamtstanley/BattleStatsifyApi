const when = require('when');
const RecentMatches = require('./recentMatchesModel');
const Match = require('./matchModel');
const config = require('../config/default')
const Repository = require('../../databaseHelpers/repository');
const RiotAPI = require('../../riotAPI/riotAPI');
const riotClient = new RiotAPI(config.riotApi.apiKey)
const RecentMatchRepo = new Repository(RecentMatches);
const MatchRepo = new Repository(Match);

const getRecentMatches = (params) => {
  const { accountId } = params;
  return RecentMatchRepo.findOne({ accountId: accountId }).then((matchData) => {
    if (matchData) {
      return getAllMatchDetails(matchData.matches, accountId)
    } else {
      return riotClient.getRecentMatches(accountId)
        .then((response) => {
          console.log('found matches via riotAPI and created entry');
          return RecentMatchRepo.create(
            Object.assign(
              {},
              JSON.parse(response), 
              { accountId }
            )).then((newRecord) => {
              //TODO have array of matches now need details => get match data here
              return getAllMatchDetails(newRecord.matches, accountId)
            });
        })
        .catch((err) => {
          console.log('no match data found for accountId');
          throw new Error(err)
        })
    }
  })
};

const getAllMatchDetails = (matchesArr, accountId) => {
  return when.all(when.map(
    matchesArr, 
    (match, index) => getMatchDetails(match.gameId, accountId)
  ))
};

const getMatchDetails = (gameId, accountId) => {
  return MatchRepo.findOne({ "match.gameId": gameId }).then((matchData) => {
    if (matchData) {
      return matchData;
    } else {
      return riotClient.getMatchById(gameId, { forAccountId: accountId })
        .then((response) => {
          console.log('found match data by gameId via API and created entry')
          return MatchRepo.create({ 
            accountId,
            match: JSON.parse(response),
          }).then((newRecord) => newRecord)
        })
        .catch((err) => {
          console.log('no match data found for gameId: ', gameId)
          return { error: 'no match found' }
        });
    }
  })
};

module.exports = {
  getRecentMatches,
  getMatchDetails,
}
