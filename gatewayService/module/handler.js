const when = require('when');
const request = require('request');
const config = require('../config/default');
const rp = require('request-promise');

const { services } = config;

const httpReq = (options) => {
  const httpOpts = {
    uri: options.url,
    method: options.method || 'GET',
  }
  return rp(httpOpts)
}

const getSummonerData = (name) => {
  return httpReq({
    url: `${services.summoner.host}/${name}`
  })
}

const getMatchData = (accountId) => {
  return httpReq({
    url: `${services.matches.host}/recent/${accountId}`
  })
}

const buildSummonerData = (params) => {
  return getSummonerData(params.summonerName)
    .then((data) => {
      return getMatchData(JSON.parse(data).accountId)
        .then((matchData) => {
          return matchData
        })
    }).catch((err) => err)
}

module.exports = {
  buildSummonerData
}

