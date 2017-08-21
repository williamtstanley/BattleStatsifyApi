const requestPromise = require('request-promise');

const urls = {
  summoner: {
    name: '/lol/summoner/v3/summoners/by-name/{summonerName}',
    byId: '/lol/summoner/v3/summoners/{summonerId}',
    byAccountId: '/lol/summoner/v3/summoners/by-account/{accountId}',
  }
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
    return this.httpReq('summoner', 'byAccountId', { accountId: accountId })
  }
}

module.exports = RiotAPI;
