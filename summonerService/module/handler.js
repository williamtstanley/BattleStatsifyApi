const getSummonerByName = (params) => {
  //TODO grab summoner from riot api if it doesn't exist in db already
  //save it to the db. If it does exist return it from the db.
  return new Promise((resolve, reject) => {
    resolve(params)
  });
}


module.exports = {
  getSummonerByName,
}
