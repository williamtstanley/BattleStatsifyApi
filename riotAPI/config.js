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
  staticdata: {
    championList: '/lol/static-data/v3/champions',
    championById: '/lol/static-data/v3/champions/{championId}',
    itemList: '/lol/static-data/v3/items',
    itemById: '/lol/static-data/v3/items/{itemId}',
    languages: '/lol/static-data/v3/languages',
    languagestrings: '/lol/static-data/v3/language-strings',
    maps: '/lol/static-data/v3/maps',
    masteryList: '/lol/static-data/v3/masteries',
    masteryById: '/lol/static-data/v3/masteries/{masteryId}',
    profileIcons: '/lol/static-data/v3/profile-icons',
    realm: '/lol/static-data/v3/realms',
    runeList: '/lol/static-data/v3/runes',
    runeById: '/lol/static-data/v3/runes/{runeId}',
    summonerSpellList: '/lol/static-data/v3/summoner-spells',
    summonerSpellById: '/lol/static-data/v3/summoner-spells/{summonerSpellId}',
    versions: '/lol/static-data/v3/versions'
  },
}

const rateLimit = {
  minsLimits: {
    time: 120000,
    limit: 100, 
  },
  secsLimits: {
    time: 1000,
    limit: 20, 
  }
}

const apiKey = {
  development: "RGAPI-4d4f2e8b-ea36-416d-926e-352d2303151b"
}

module.exports = {
  urls,
  rateLimit,
  apiKey
}
