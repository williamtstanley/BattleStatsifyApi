const requestPromise = require('request-promise');
const when = require('when');
const config = require('./config');

class RiotAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.rp = requestPromise;
    this.urls = config.urls;
    this.rateLimit = config.rateLimit;
    this.lastCall = Date.now();
    this.calls = 0;
  }

  getUrl(path, options) {
    if (options) {
      delete options.query
      Object.keys(options).forEach((key) => {
        path = path.replace(`{${key}}`, options[key]);
      });   
    }

    //TODO add region support rather then only searching na1
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

  getMatchTimeline(matchId) {
    return this.checkRateLimit()
      .then(() => this.httpReq('match', 'timelines', { matchId }))
  }

  getLeaguePositionBySummoner(summonerId) {
    return this.checkRateLimit()
      .then(() => this.httpReq('league', 'positionsBySummonerId', { summonerId }))
  }

  getChampionById(championId) {
    return this.httpReq('staticData', 'championById', {
      championId, 
      query: { locale: 'en_US' } 
    })
  }

  getChampionList() {
    return this.httpReq('staticdata', 'championList', { query: {
      locale: 'en_US',
      dataById: false
    }})
  }

}

module.exports = RiotAPI;
