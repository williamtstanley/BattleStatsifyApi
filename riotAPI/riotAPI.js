const requestPromise = require('request-promise');
const when = require('when');

const constants = {
  MINUTE: 1000 * 60,
  SECOND: 1000,
}

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
    this.rateLimit = this.setRateLimit();
    this.lastCall = Date.now();
    this.calls = 0;
  }

  getUrl(path, options) {
    delete options.query
    //TODO add region support rather then only searching na1
    Object.keys(options).forEach((key) => {
      path = path.replace(`{${key}}`, options[key]);
    });    
    return `https://na1.api.riotgames.com${path}`;
  }

  httpReq(callDest, callMethod, options) {
    const { query } = options;
    const url = this.getUrl(this.urls[callDest][callMethod], options);
    const httpOpts = {
      uri: url,
      method: 'GET',
      headers: {
        'X-Riot-Token': this.apiKey,
      },
    }

    if (query) httpOpts.qs = query

    return this.rp(httpOpts)
  }
  
  setRateLimit(rateLimitStr) {
    //100:120,20:1
    //TODO dynamically update based on header x-app-rate-limit
    //Currently hard coded to dev numbers
    //after more thought I have come to the conclusion that I need a request queue
    //however I don't think I will build one right now as time is a factor in this endevour
    if (!this.rateLimit) {
      return {
        minsLimits: {
          time: 120000,
          limit: 100, 
        },
        secsLimits: {
          time: 1000,
          limit: 20, 
        },
      };
    }
  }
  
  checkRateLimit() {
    this.calls++
    if (this.calls === 1) this.lastCall = Date.now();
    const { minsLimits, secsLimits } = this.rateLimit;
    const diff = Date.now() - this.lastCall;
    
    if (this.calls >= minsLimits.limit && diff < minsLimits.time) {
      this.calls = 1;
      this.lastCall = Date.now()

      return this.delay(minsLimits.time - diff)
    } else if (this.calls >= secsLimits.limit && diff < secsLimits.time) {
      return this.delay(secsLimits.time - diff)
    }

    return when()
  }

  delay(time) {
    console.log('adding rate delay', time)
    return new Promise((resolve) => { 
      setTimeout(resolve, time)
    });
  }

  getSummonerByName(name) {
    return this.checkRateLimit()
      .then(() => this.httpReq('summoner', 'name', { summonerName: name }))
  }

  getSummonerById(id) {
    return this.checkRateLimit()
      .then(() => this.httpReq('summoner', 'byId', { summonderId: id }))
  }

  getSummonerByAccountId(accountId) {
    return this.checkRateLimit()
      .then(() => this.httpReq('summoner', 'byAccountId', { accountId }))
  }

  getMatchesByAccountId(accountId) {
    return this.checkRateLimit()
      .then(() => this.httpReq('match', 'byAccountId', { accountId: accountId }))
  }
  
  getMatchById(matchId, query) {
    const opts = { matchId };
    if (query) opts.query = query;

    return this.checkRateLimit()
      .then(() => this.httpReq('match', 'byId', opts))
  }

  getRecentMatches(accountId) {
    return this.checkRateLimit()
      .then(() => this.httpReq('match', 'recent', { accountId }))
  }

  getLeaguePositionBySummoner(summonerId) {
    return this.checkRateLimit()
      .then(() => this.httpReq('league', 'positionsBySummonerId', { summonerId }))
  }

}

module.exports = RiotAPI;
