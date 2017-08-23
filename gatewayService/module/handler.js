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
      const parsedData = JSON.parse(data)
      return getMatchData(parsedData.accountId)
        .then((matchData) => {
          return Object.assign({}, parsedData, {
            recent: JSON.parse(matchData)
          })
        })
        .catch((err) => {
          return parsedData
        })
    }).catch((err) => {
      return new Error(err)
    })
}

module.exports = {
  buildSummonerData
}

