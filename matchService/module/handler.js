const when = require('when');
const config = require('../config/default')

const Repository = require('../../databaseHelpers/repository');
const RiotAPI = require('../../riotAPI/riotAPI');
const RecentMatches = require('./recentMatchesModel');
const Match = require('./matchModel');
const Timeline = require('./timelineModel');

const riotClient = new RiotAPI()
const RecentMatchRepo = new Repository(RecentMatches);
const MatchRepo = new Repository(Match);
const TimelineRepo = new Repository(Timeline);

// handler functions 

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

const getMatchTimeline = (params) => {
  const { matchId } = params;
  return TimelineRepo.findOne({ matchId }).then((timelineData) => {
    if (timelineData) {
      console.log('found timeline in database')
      return timelineData;
    } else {
      return riotClient.getMatchTimeline(matchId)
        .then((response) => {
          console.log('found timeline via api')
          return TimelineRepo.create(
            Object.assign(
              {},
              JSON.parse(response),
              { matchId }
            )
          )
        })
        .catch((err) => { error: 'no timeline found' })
    }
  })
}

//helper functions

const getAllMatchDetails = (matchesArr, accountId) => {
  return when.all(when.map(
    matchesArr, 
    (match, index) => getMatchDetails(match.gameId, accountId)
  ))
};

const getMatchDetails = (gameId, accountId) => {
  return MatchRepo.findOne({ "match.gameId": gameId }).then((matchData) => {
    if (matchData) {
      console.log('found match in database')
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
          return { error: 'no match found' }
        });
    }
  })
};


module.exports = {
  getRecentMatches,
  getMatchTimeline
}
