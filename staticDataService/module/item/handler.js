const when = require('when');
const ItemModel = require('./model');
const config = require('../../config/default')
const Repository = require('../../../databaseHelpers/repository');
const RiotAPI = require('../../../riotAPI/riotAPI');
const riotClient = new RiotAPI()
const ItemRepo = new Repository(ItemModel);

const getItemList = () => {
  return ItemRepo.find({}).then((itemsData) => {
    if (itemsData && itemsData.length) {
      console.log('found item list in the db')
      return itemsData;
    } else {
      return riotClient.getItemList()
        .then((response) => {
          console.log('found item list via api')
          const parsedData = JSON.parse(response).data;
          return when.all(
            when.map(
              Object.keys(parsedData).map((k) => parsedData[k]),
              (itemData) => {
                return ItemRepo.create(itemData).then((newEntry) => newEntry)
              }
            )
          )
        })
        .catch((err) => {
          console.log('No Item list found!')
          throw new Error(err)
        })
    }
  })
}

module.exports = {
  getItemList,
}
