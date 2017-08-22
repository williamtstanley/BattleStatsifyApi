const requestPromise = require('request-promise');
const when = require('when');

const urls = {
  summoner: {
    name: '/lol/summoner/v3/summoners/by-name/{summonerName}',
    byId: '/lol/summoner/v3/summoners/{summonerId}',
    byAccountId: '/lol/summoner/v3/summoners/by-account/{accountId}',
  },
  match: {
    byId: '/lol/match/v3/matches/{matchId}',
    byAccountId: '/lol/match/v3/matchlists/by-account/{accountId}',
    recent: '/lol/match/v3/matchlists/by-account/{accountId}/recent',
    timelines: '/lol/match/v3/timelines/by-match/{matchId}',
    byTournamentCode: '/lol/match/v3/matches/by-tournament-code/{tournamentCode}/ids',
    byMatchIdByTournamentCode: '/lol/match/v3/matches/{matchId}/by-tournament-code/{tournamentCode}'
  },
  league: {
    bySummonerId: '/lol/league/v3/leagues/by-summoner/{summonerId}',
    positionsBySummonerId:'/lol/league/v3/positions/by-summoner/{summonerId}',
    masterLeaguesByQueue: '/lol/league/v3/masterleagues/by-queue/{queue}',
    challengerLeaguesByQueue: '/lol/league/v3/challengerleagues/by-queue/{queue}'
  },
}

class RiotAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.rp = requestPromise;
    this.urls = urls;
  }

  getUrl(path, options) {
    //TODO add region support rather then only searching na1
    Object.keys(options).forEach((key) => {
      path = path.replace(`{${key}}`, options[key]);
    });    
    return `https://na1.api.riotgames.com${path}`;
  }

  httpReq(callDest, callMethod, options) {
    const url = this.getUrl(this.urls[callDest][callMethod], options);
    const httpOpts = {
      uri: url,
      method: 'GET',
      headers: {
        'X-Riot-Token': this.apiKey,
      }
    }
    return this.rp(httpOpts)
  }

  getSummonerByName(name) {
    return this.httpReq('summoner', 'name', { summonerName: name })
  }

  getSummonerById(id) {
    return this.httpReq('summoner', 'byId', { summonderId: id })
  }

  getSummonerByAccountId(accountId) {
    return this.httpReq('summoner', 'byAccountId', { accountId })
  }

  getMatchesByAccountId(accountId) {
    return this.httpReq('match', 'byAccountId', { accountId: accountId })
  }
  
  getMatchById(matchId) {
    return this.httpReq('match', 'byId', { matchId: matchId })
  }

  getRecentMatches(accountId) {
    return this.httpReq('match', 'recent', { accountId })
  }

  getAllMatchDetailsById(matchIdArray) {
    return when.map(matchIdArray, (matchId, index) => {
      return this.getMatchById(matchId); 
    });
  }

  getLeaguePositionBySummoner(summonerId) {
    return this.httpReq('league', 'positionsBySummonerId', { summonerId })
  }

}

module.exports = RiotAPI;
