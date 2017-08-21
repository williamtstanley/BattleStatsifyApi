const when = require('when');
const Model = require('./model');
const Repository = require('../../databaseHelpers/repository');
const summonerRepo = new Repository(Model);


const getSummonerByName = (params) => {
  //TODO grab summoner from riot api if it doesn't exist in db already
  //save it to the db. If it does exist return it from the db.
  return summonerRepo.findOne({ "accountName.name": params.summonerName }).then((summonerData) => {
    if (summonerData) console.log('found one');
    if (!summonerData) console.log('nope Nada');
    return params
  });
}


module.exports = {
  getSummonerByName,
}
